let movies; // List of movies from TMDB
let movie; //
let cast;

describe("Get cast", () => {
  before(() => {
    // Get the discover movies from TMDB and store them locally.
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body") // Take the body of HTTP response from TMDB
      .then((response) => {
        movies = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/movies/home");
  });

  describe("The Discover Movies page", () => {
    it("displays the page header and 20 movies", () => {
      cy.get("h3").contains("Discover Movies");
      cy.get(".MuiCardHeader-root").should("have.length", 20);
    });

    it("displays the correct movie titles", () => {
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(movies[index].title);
      });
    });
  });
  describe("The movie details page",
    {
      viewportHeight: 1080,
      viewportWidth: 1920,
    }, () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/movie/${
          movies[1].id
        }?api_key=${Cypress.env("TMDB_KEY")}`
      )
        .its("body")
        .then((movieDetails) => {
          movie = movieDetails;
        });
      cy.request(
        `https://api.themoviedb.org/3/movie/${movies[1].id}/credits?api_key=${Cypress.env("TMDB_KEY")}`
      ).its("body")
      .then((response) => {
        cast = response.cast;
      });
    });
    beforeEach(() => {
      cy.visit(`/movies/${movies[1].id}`);
    });
    it(" displays the movie title, and correct cast list ", () => {
      cy.get("h3").contains(movie.title);
      cy.get("h3").eq(2).contains("Cast");
      cy.get(".MuiGrid-root").eq(3).find(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(cast[index].name);
      });
    });
  });
});