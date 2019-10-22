# Meddit
Reddit for Medicine
## Purpose

This app is intended as a proof of concept to see if the PubMed, a US Government citation database (comprosed of more than 30 million biomedical citations), is accessible and useful to patient groups. Used by the medical, scientific and healthcare profession, Meddit explores ways to make PubMed accessible to patients. As patients become better educated and the body of research grows, doctors cannot stay current on personalized state-of-the-art therapies and treatments, so patients need to assume the role of partner with their medical providers. Additionally there is a need to close the gap with the  quality of care received with a provider at a research institution vs regional health-care centers. Thus having an app and site geared to patients that is easy to access scientific and medical literature and interact with the community would improve patient education and have implications on care. This site provides a way to look up via PubMed Central API, current papers by disease group.


## Technologies Used 

The app uses 3 PubMed Central (PMC) APIs (https://www.ncbi.nlm.nih.gov/pmc/tools/developers/):

* Retrieve PMC article identifiers (PMCIDs)(https://www.ncbi.nlm.nih.gov/pmc/tools/get-pmcids/)

* Search for associated metadata by PMCIDs (https://www.ncbi.nlm.nih.gov/pmc/tools/get-metadata/)

* Find associated abstracts using E-Fetch with PubMed (https://www.ncbi.nlm.nih.gov/pmc/tools/get-metadata/). This data is available as a string and was manipulated with to extract the abstract.

## Approach 

1. Identify disease groups and create an array of disease groups.
2. Search for relevant papers by retrieving PMC article id.
3. Use the ID search for metadata and extract author, title, journal, and publication date.
4. Allow user to scan through and select an article, which will prompt a call to the third API to retrieve the abstract. 
5. The record is retrieved and parsed by section since the file is inaccessible (it says it is in JSON but as far as I can tell it is not)
6. The app stores the current number of articles and allows the user to progress to the next or previous batch of articles. 
7. User may also reset the whole site and search a different disease group. 

## Link to live site
http://meddit.surge.sh/#results

## Installation instructions

## Future Development
* Link to WorldCat by title to access locations of the article near user.
* Input field to allow users to search by specific interest and thereby increase the signal to noise ratio.
* Add another API to use the NCBI MeSH (Medical Subject Headings) to help narrow search critera


