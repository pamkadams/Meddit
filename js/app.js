$(() => {
  let journalIds = [];
  let articleId = "";
  let articleArr = [];

  //medical conditions for drop down search options
  const diseaseCategories = [
    "heart%20disease",
    "chronic%20lower%20respiratory",
    "stroke",
    "Alzheimer’s%20disease",
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
    "Alzheimer’s disease",
    "diabetes",
    "influenza pneumonia",
    "Kidney disease",
    "suicide",
    "Septicemia",
    "Liver diseases"
  ];
  //populate search dropdown
  for (let i = 0; i < diseaseNames.length; ++i) {
    const $disease = $("<a>").text(diseaseNames[i]);
    $(".dropdown-content").append($disease);
  }

  //extracts key data from metadata record for article
  const gotMetaData = metadata => {
    //The article id is buried in the json object, it is pulled out below as $uids
    const $uids = metadata.result.uids[0];

    const articleObj = {
      articleId: $uids,
      title: metadata.result[$uids].title,
      author: metadata.result[$uids].authors[0].name,
      pubdate: metadata.result[$uids].pubdate,
      journal: metadata.result[$uids].fulljournalname
    };

    console.log(articleObj);
    articleArr.push(articleObj);
    //pass the article object to the display function
    //displayArticle(articleObj);
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
    for (let i = 0; i < 6; ++i) {
      journalIds.push(data.esearchresult.idlist[i]);
      grabMetaData(data.esearchresult.idlist[i]);
    }
  };

  //AJAX call to the NCIB database
  $.ajax(
    "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pmc&term=diabetes&retmode=json"
  ).then(handleData);
});
