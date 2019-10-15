const journalIds = [];
const articleId = "";
$(() => {
  const gotIds = article => {
    console.log(article);
  };

  const grabMetaData = articleId => {
    console.log("metadata article number", articleId);
    $.ajax(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pmc&id=${articleId}&retmode=json`
    ).then(gotIds);
  };

  const handleData = data => {
    console.log("all data", data);
    for (let i = 0; i < 20; ++i) {
      journalIds.push(data.esearchresult.idlist[i]);
      let articleId = journalIds[i];
    }
    console.log("journalIds array", journalIds);
    console.log("first article", journalIds[0]);
    grabMetaData(journalIds[0]);
  };
  $.ajax(
    "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pmc&term=diabetes&retmode=json"
  ).then(handleData);

  //   const handleData = data => {
  //     for (let i = 0; i < $("#number").val(); ++i) {
  //       const obj = {
  //         descriptor: data[i].descriptor,
  //         resolution: data[i].resolution_description
  //       };
  //       if (obj.resolution === undefined) obj.resolution = "Not resolved";

  //       const descriptor = $("<p>")
  //         .text(obj.descriptor)
  //         .addClass("description");
  //       $(".results").append(descriptor);
  //       const policeButton = $("<button>").text("What did the police do?");
  //       policeButton.attr("id", `button${i}`).addClass("policebutton");
  //       $(descriptor).append(policeButton);
  //       const resolution = $("<p>")
  //         .text(obj.resolution)
  //         .addClass("resolution")
  //         .hide();
  //       $(descriptor).append(resolution);
  //       $(policeButton).click(() => {
  //         resolution.show();
  //       });
  //     }
  //   };

  //   $("#brooklyn").click(() => {
  //     event.preventDefault();

  //     $.ajax(
  //       "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?agency=NYPD&borough=BROOKLYN"
  //     ).then(handleData);
  //   });

  //   $("#manhattan").click(() => {
  //     event.preventDefault();

  //     console.log(num);
  //     $.ajax(
  //       "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?agency=NYPD&borough=MANHATTAN"
  //     ).then(handleData);
  //   });

  //   $("#queens").click(() => {
  //     event.preventDefault();
  //     $.ajax(
  //       "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?agency=NYPD&borough=QUEENS"
  //     ).then(handleData);
  //   });

  //   $("#bronx").click(() => {
  //     event.preventDefault();
  //     $.ajax(
  //       "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?agency=NYPD&borough=BRONX"
  //     ).then(handleData);
  //   });

  //   $("#statenisland").click(() => {
  //     event.preventDefault();
  //     $.ajax(
  //       "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?agency=NYPD&borough=STATEN ISLAND"
  //     ).then(handleData);
  //   });
});
