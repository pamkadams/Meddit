$(() => {
  let testId = [6757044, 22368089];

  const testAbstract = article => {
    $.ajax(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${article}&remote=json`
    ).then(data => {
      if (data.indexOf("abstract")) {
        // console.log(data.indexOf("abstract"));
        //   console.log(data);
        //   console.log(typeof data);
        const str = data.slice(data.indexOf("abstract"));
        //   console.log(str);
        const abstract = str.slice(8, str.indexOf("mesh {"));
        const $abstract = $("<div>").text(abstract);
        $("main").append($abstract);
        abstract;
      } else console.log("Abstract not available.");
      console.log(testId);
    });
  };
  for (let i = 0; i < testId.length; ++i) {
    testAbstract(testId[i]);
  }
});
