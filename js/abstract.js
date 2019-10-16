$(() => {
  console.log("ready");
  $.ajax(
    "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=6757044&remote=json"
  ).then(data => {
    if (data.indexOf("abstract")) {
      // console.log(data.indexOf("abstract"));
      //   console.log(data);
      //   console.log(typeof data);
      const str = data.slice(data.indexOf("abstract"));
      //   console.log(str);
      const abstract = str.slice(8, str.indexOf("mesh {"));
      console.log(abstract);
    } else console.log("abstract not available");
  });
});
