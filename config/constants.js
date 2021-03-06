module.exports = {
    connectionString: "mongodb://localhost/moviesDb",
    genres: ["action", "sci-fi", "fantasy", "horror", "comedy"],
    pagesCount: 50,
    asyncPagesCount: 15,
    timeToNextRequest: 1000,
    selectorLinkOfMovieTitle: ".col-title span[title] a",
    selectorLinkOfFilmCategories: "#filmography .filmo-category-section .filmo-row b a",
    selectorActorImage: "#name-poster",
    selectorActorName: "#overview-top h1 span",
    selectorActorBio: "#name-bio-text div div",
    selectorAllActors: ".cast_list .itemprop a",
    selectorCategories: "span[itemprop='genre']",
    selectorMovieImage: ".poster a img",
    selectorMovieTrailer: ".slate a",
    selectorMovieTitle: ".title_wrapper h1",
    selectorMovieDescription: "div[itemprop='description'] p",
    selectorMovieReleaseDate: "meta[itemprop='datePublished']",
    attributeSrcName: "src",
    attributeHrefName: "href",
    attributeContentName: "content"
};