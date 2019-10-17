$(() => {
  let journalIds = [];
  let articleId = "";
  let articleArr = [];
  let articleObj = {};

  //medical conditions for drop down search options
  const diseaseCategories = [
    "heart%20disease",
    "chronic%20lower%20respiratory",
    "stroke",
    "diabetes",
    "influenza%20pneumonia",
    "Kidney%20disease",
    "suicide",
    "Septicemia",
    "Liver%20diseases"
  ];

  const diseaseNames = [
    "heart disease",
    "chronic lower respiratory",
    "stroke",
    "diabetes",
    "influenza pneumonia",
    "Kidney disease",
    "suicide",
    "Septicemia",
    "Liver diseases"
  ];
  //populate search dropdown
  for (let i = 0; i < diseaseNames.length; i++) {
    const $disease = $("<a>")
      .attr("id", `${diseaseCategories[i]}`)
      .text(diseaseNames[i])
      .addClass("clickable");
    $(".dropdown-content").append($disease);
  }

  const getAbstract = event => {
    console.log("working");
    const abstractId = event.currentTarget.id;
    console.log(abstractId);
    $.ajax(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${abstractId}&remote=json`
    ).then(data => {
      console.log(data);
      if (data.indexOf("abstract") >= 0) {
        // console.log(data.indexOf("abstract"));
        //   console.log(data);
        //   console.log(typeof data);
        const str = data.slice(data.indexOf("abstract"));
        //   console.log(str);
        const abstract = str.slice(8, str.indexOf("mesh {"));
        const $abstract = $("<div>").text(abstract);
        $(`#${abstractId}`).append($abstract);
      } else console.log("Abstract not available.");
      console.log(abstract);
    });
  };

  //display article information from search
  const displayArticle = article => {
    const $articleContainer = $("<div>")
      .attr("id", `${article.articleId}`)
      .addClass("container");
    $(".results").append($articleContainer);

    const $author = $("<p>")
      .addClass("author")
      .text(article["author"]);
    $($articleContainer).append($author);

    const $title = $("<div>")
      .addClass("title")
      .text(article["title"]);
    $($articleContainer).append($title);

    const $journal = $("<p>")
      .addClass("journal")
      .text(article["journal"]);
    $($articleContainer).append($journal);

    const $pubDate = $("<p>")
      .addClass("pubdate")
      .text(article["pubdate"]);
    $($articleContainer).append($pubDate);
  };
  //extracts key data from metadata record for article
  const gotMetaData = metadata => {
    //The article id is buried in the json object, it is pulled out below as $uids
    const $uids = metadata.result.uids[0];

    articleObj = {
      articleId: $uids,
      title: metadata.result[$uids].title + ".",
      author: metadata.result[$uids].authors[0].name + ".",
      pubdate: metadata.result[$uids].pubdate + ".",
      journal: metadata.result[$uids].fulljournalname + "."
    };

    // console.log(articleObj);
    articleArr.push(articleObj);
    displayArticle(articleArr[articleArr.length - 1]);
    console.log(articleArr);

    //pass the article object to the display function
  };

  //use article id to grab metadata record for each article
  const grabMetaData = articleId => {
    $.ajax(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pmc&id=${articleId}&retmode=json
      `
    ).then(gotMetaData);
  };

  //takes the PMC ids for 6 articles and push them into journalIds array.
  const handleData = data => {
    console.log("raw Journal IDs", data);
    //searches PMC for all articles associated with the disease group.
    //articleid from the pmc query is the pmcid ID number (actually a string)
    for (let i = 0; i < 4; ++i) {
      journalIds.push(data.esearchresult.idlist[i]);
      grabMetaData(data.esearchresult.idlist[i]);
    }
  };

  //AJAX call to the NCIB database
  const callNCIB = event => {
    console.log("ready");
    console.log(event.currentTarget);
    const disease = event.currentTarget.id;
    console.log("disease", disease);

    $.ajax(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pmc&term=${disease}}&retmode=json`
    ).then(handleData);
  };

  // const worldCat=()=>{
  //   https://www.worldcat.org/title/cognitive-and-neuroanatomic-accounts-of-referential-communication-in-focal-dementia/oclc/8211639446&referer=brief_results
  // }
  //listeners and handlers

  //select a medical condition
  $(".clickable").on("click", callNCIB);

  $(".results").on("click", ".container", event => {
    getAbstract(event);
  });

  // $(".container").on("click", worldCat);
});
