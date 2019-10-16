$(() => {
  let journalIds = [];
  let articleId = "";
  let articleArr = [];

  //extracts key data from metadata record for article
  const gotMetaData = metadata => {
    //article is an Object keys for display via the DOM:
    //all fields are off these paths -- result.articleid. (both are objects that hold the rest)
    //FYI articleId  is in the object articleids which is an array and is id is in index 2 -  example - 2: {idtype: "pmcid", value: "PMC6791746"} from the pmc query is the pmcid ID number (actually a string). The initial query in this app does NOT have PMC in front of the id.
    //authors[0] - array and first author of the paper is index 0
    //pubdate - publication date mm/dd/yy string
    //fulljournalname - journal publication
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
    displayArticle(articleObj);
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
