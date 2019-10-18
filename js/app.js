$(() => {
  let journalIds = [];
  let articleId = "";
  let articleArr = [];
  let articleObj = {};
  let currentPage = [];

  //medical conditions for API search options and drop-down menu
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

  //API call for abstract on article clicked
  const getAbstract = event => {
    console.log("working");
    const abstractId = event.currentTarget.id;
    console.log(abstractId);
    $.ajax(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${abstractId}&remote=json`
    ).then(data => {
      if (!data.includes("abstract")) {
        const $absent = $("<div>")
          .addClass("abstract")
          .text("Abstract not available");
        $(`#${abstractId}`).append($absent);
      } else {
        // console.log(data.indexOf("abstract"));
        //   console.log(data);
        //   console.log(typeof data);
        const str = data.slice(data.indexOf("abstract"));
        //   console.log(str);
        const abstract = str.slice(8, str.indexOf("mesh {"));
        const $abstract = $("<div>").text(abstract);
        $(`#${abstractId}`).append($abstract);
      }
    });
  };

  //display article information from search
  const displayArticle = article => {
    const $articleContainer = $("<div>")
      .attr("id", `${article.articleId}`)
      .addClass("container");
    $(".allarticles").append($articleContainer);

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

  // function sleep(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }

  //use article id to grab metadata record for each article
  const grabMetaData = articleId => {
    var now = new Date().getTime();
    while (new Date().getTime() < now + 500) {
      /* do nothing */
    }

    $.ajax(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pmc&id=${articleId}&retmode=json
      `
    ).then(gotMetaData);
  };

  //takes the PMC ids for 6 articles and push them into journalIds array.
  const handleData = data => {
    //searches PMC for all articles associated with the disease group.
    //articleid from the pmc query is the pmcid ID number (actually a string)
    for (let i = 0; i < 20; ++i) {
      journalIds.push(data.esearchresult.idlist[i]);
      grabMetaData(data.esearchresult.idlist[i]);
    }
  };

  //AJAX call to the NCIB database
  const callNCIB = event => {
    console.log(event.currentTarget.id);
    if (currentPage.length === 0) {
      const disease = event.currentTarget.id;
      currentPage = [event.currentTarget.id, 21];
      $.ajax(
        `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pmc&term=${disease}}&retmode=json`
      ).then(handleData);
    } else {
      $(".allarticles").empty();

      if (event.currentTarget.id === $("#prevbtn")) {
        const prevpg = currentPage[1] - 20;
        currentPage[1] = prevpg;
        $.ajax(
          `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pmc&term=${
            currentPage[0]
          }&retmode=json&retstart=${currentPage[1]}&retmax=20`
        ).then(handleData);
      } else {
        const nextpg = currentPage[1] + 20;
        currentPage[1] = nextpg;
        $.ajax(
          `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pmc&term=${
            currentPage[0]
          }&retmode=json&retstart=${currentPage[1]}&retmax=20`
        ).then(handleData);
      }
    }
  };

  // const worldCat=()=>{
  //   https://www.worldcat.org/title/cognitive-and-neuroanatomic-accounts-of-referential-communication-in-focal-dementia/oclc/8211639446&referer=brief_results
  // }
  //listeners and handlers

  //select a medical condition
  $(".clickable").one("click", callNCIB);

  $(".results").on("click", "#nextbtn", event => {
    callNCIB(event);
  });

  $(".results").on("click", "#prevbtn", event => {
    callNCIB(event);
  });

  $(".results").on("click", ".container", event => {
    getAbstract(event);
  });
  $(".results").on("click", "#reset", event => {
    console.log("working");
    currentPage = [];
    $(".allarticles").html("");
  });
});
// $(".container").on("click", worldCat);
