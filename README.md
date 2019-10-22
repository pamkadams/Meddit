# Meddit
Reddit for Medicine
## Purpose

This app is intended as a proof of concept to see if the PubMed, a US Government citation database (comprosed of more than 30 million biomedical citations), is accessible and useful to patient groups. Used by the medical, scientific and healthcare profession, Meddit explores ways to make PubMed accessible to patients. As patients become better educated and the body of research grows, doctors cannot stay current on personalized state-of-the-art therapies and treatments, so patients need to assume the role of partner with their medical providers. Additionally there is a need to close the gap with the  quality of care received with a provider at a research institution vs regional health-care centers. Thus having an app and site geared to patients that is easy to access scientific and medical literature and interact with the community would improve patient education and have implications on care. This site provides a way to look up via PubMed Central API, current papers by disease group.


## Technologies Used 

The app uses 3 PubMed Central (PMC) APIs (https://www.ncbi.nlm.nih.gov/pmc/tools/developers/):

* Retrieve PMC article identifiers (PMCIDs)(https://www.ncbi.nlm.nih.gov/pmc/tools/get-pmcids/)

* Search for associated metadata by PMCIDs (https://www.ncbi.nlm.nih.gov/pmc/tools/get-metadata/)

* Find associated abstracts using E-Fetch with PubMed (https://www.ncbi.nlm.nih.gov/pmc/tools/get-metadata/).

## Approach 

1. Identify disease groups and create an array of disease groups.
2. Search for relevant papers by retrieving PMC article id.
3. Use the ID search for metadata and extract author, title, journal, and publication date.
4. Allow user to scan through and select an article, which will prompt a call to the third API to retrieve the abstract. 
5. The record is retrieved and parsed by section since the file is inaccessible (it says it is in JSON but as far as I can tell it is not)
6. The app stores the current number of articles and allows the user to progress to the next or previous batch of articles. 
7. User may also reset the whole site and search a different disease group. 

## Challenges
1. Event handlers and drop-down menus on dynamically-created elements required attaching it to the parent that wasn't dynamically created. 
```
$(".clickable").on("click", callNCIB);

  $(".results").on("click", "#nextbtn", event => {
    callNCIB(event);
  });
  ```

2. Access to no more than 3 records in a second. The query was timing out with a 429 error. I had to slow down my code and Stack Overflow came to my rescue. Secondly it was taking way too long to load the 20 records (PMC API sends out 20 articles at a time) into the browser, so I had to modify how I was capturing the data before I was displaying it. I was first capturing all 20 records before populating, but then I modified the code to pass each article as a separate object to the display function. Lastly I needed some way to have the user know the site was working. Adding a loading circle was the solution. Tried out a few and settled on one that relied on css to generate. I used transform on the container  and animation on the icon itself. Attached it to the function 
```
 //AJAX call to the NCIB database
  const callNCIB = event => {
    $(".waitingcontainer").toggle();
```
```$(".waitingcontainer").hide();```
```
.waitingcontainer {
  background-color: #fafbff;

  transform: translate(-50%, -50%);
  /* padding: 10px 30px; */
  margin-top: 20px;
  margin-left: 10px;
  border-radius: 50%;
  z-index: 2;
}

.waitingicon {
  display: inline-block;
  border: 10px solid #fafbff;
  width: 40%;
  height: 40%;
  border-radius: 50%;
  border-top-color: #01bfa5;
  border-left-color: #01bfa5;
  animation: spin 2s infinite ease-in-out;
  z-index: 2;
}
```
3. Retrieving the abstract was difficult because the code was not recognizable by javascript as anything but text - no ability to use arrays, objects, etc. to get into the inner part of the code.

```
Beginning of the 
Pubmed-entry ::= {
  pmid 6802935,
  medent {
    em std {
      year 1981,
      month 11,
      day 1,
      hour 0,
      minute 0
    },
    cit {
      title {
        name "Resistance to fluorouracil in Candida utilis: effects on the
 uptake of pyrimidines and amino acids."
      },
      authors {
        names ml {
          "Wild DG",
          "Wilson GI"
        }
      },
      from journal {
        title {
          iso-jta "J. Gen. Microbiol.",
          ml-jta "J Gen Microbiol",
          issn "0022-1287",
          name "Journal of general microbiology"
        },
        imp {
          date std {
            year 1981,
            month 11
          },
          volume "127",
          issue "1",
          pages "45-53",
          language "eng",
          pubstatus ppublish,
          history {
            {
              pubstatus pubmed,
              date std {
                year 1981,
                month 11,
                day 1
              }
            },
            {
              pubstatus medline,
              date std {
                year 1981,
                month 11,
                day 1,
                hour 0,
                minute 1
              }
            },
            {
              pubstatus other,
              date std {
                year 1981,
                month 11,
                day 1,
                hour 0,
                minute 0
              }
            }
          }
        }
      },
      ids {
        pubmed 6802935,
        doi "10.1099/00221287-127-1-45"
      }
    },
    abstract "5-Fluorouracil powerfully inhibits growth of Candida utilis.
 Isolates that are resistant to fluorouracil all have a reduced ability to
 transport uracil but most also have other defects. Their capacity to take up
 a wide range of amino acids is greatly reduced, as is their ability to alter
 rates of amino acid transport during nitrogen starvation. These isolates may
 be defective in the coupling of energy generation to transport systems.",
    mesh {
      {
        term "Amino Acids",
        qual {
          {
            mp TRUE,
            subh "metabolism"
          }
        }
      },
      {
        term "Biological Transport",
        qual {
          {
            subh "drug effects"
          }
        }
      },
      {
        term "Candida",
        qual {
          {
            mp TRUE,
            subh "drug effects"
          },
          {
            subh "metabolism"
          }
        }
      },
      {
        term "Drug Resistance, Microbial"
      },
      {
        term "Fluorouracil",
        qual {
          {
            mp TRUE,
            subh "pharmacology"
          }
        }
      },
      {
        term "Lysine",
        qual {
          {
            subh "metabolism"
          }
        }
      },
      {
        term "Nitrogen",
        qual {
          {
            subh "metabolism"
          }
        }
      },
      {
        term "Uracil",
        qual {
          {
            mp TRUE,
            subh "metabolism"
          }
        }
      }
    },
    substance {
      {
        type nameonly,
        name "Amino Acids"
      },
      {
        type cas,
        cit "56HH86ZVCT",
        name "Uracil"
      },
      {
        type cas,
        cit "K3Z4F929H6",
        name "Lysine"
      },
      {
        type cas,
        cit "N762921K75",
        name "Nitrogen"
      },
      {
        type cas,
        cit "U3P01618RT",
        name "Fluorouracil"
      }
    },
    pmid 6802935,
    pub-type {
      "Journal Article",
      "Research Support, Non-U.S. Gov't"
    },
    status medline
  }
}
```
code snippet:

```const getAbstract = event => {
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
        console.log(data.indexOf("abstract"));
        console.log(data);
        console.log(typeof data);
        const str = data.slice(data.indexOf("abstract"));
        //   console.log(str);
        const abstract = str.slice(8, str.indexOf("mesh {"));
        const $abstract = $("<div>").text(abstract);
        $(`#${abstractId}`).append($abstract);
      }
    });
  };
  ```

## Link to live site
https://5daf5ee5277f65d5218ae254--pedantic-bartik-ecc4e3.netlify.com/#results
http://meddit.surge.sh/#results



## Future Development
* Link to WorldCat by title to access locations of the article near user.
* Input field to allow users to search by specific interest and thereby increase the signal to noise ratio.
* Add another API to use the NCBI MeSH (Medical Subject Headings) to help narrow search critera
* Add user comment capability
* Log in and security
* Ability to annotate and up/down vote articles

## Citation: 
National Center for Biotechnology Information (NCBI)[Internet]. Bethesda (MD): National Library of Medicine (US), National Center for Biotechnology Information; [1988] – [cited 2019 Oct 22]. Available from: https://www.ncbi.nlm.nih.gov/
