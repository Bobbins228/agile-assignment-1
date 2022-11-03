let upcomingMovies; 
let nowPlayingMovies;
let topRatedMovies;
let trendingMovies;
describe("get movies lists", () => {
    before(() => {
        // Get the upcoming movies from TMDB and store them locally.
        cy.request(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&page=1`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                upcomingMovies = response.results;
            });
        // Get the now playing movies from TMDB and store them locally.
        cy.request(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${Cypress.env(
            "TMDB_KEY"
            )}&language=en-US&page=1`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                nowPlayingMovies = response.results;
            });
        // Get the top rated movies from TMDB and store them locally.
        cy.request(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${Cypress.env(
            "TMDB_KEY"
            )}&language=en-US&page=1`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                topRatedMovies = response.results;
            });
        // Get the trending movies from TMDB and store them locally.
        cy.request(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=${Cypress.env(
            "TMDB_KEY"
            )}`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                trendingMovies = response.results;
            });
        });
    describe("Upcoming Movies list", () => {
        beforeEach(()=>{
            cy.visit("/movies/upcoming")
        })
        it("displays the page header and 20 movies", () => {
            cy.get("h3").contains("Upcoming Movies");
            cy.get(".MuiCardHeader-root").should("have.length", 20);
          });
      
          it("displays the correct movie titles", () => {
            cy.get(".MuiCardHeader-content").each(($card, index) => {
              cy.wrap($card).find("p").contains(upcomingMovies[index].title);
            });
          });
    });
    describe("Now Playing Movies list", () => {
        beforeEach(()=>{
            cy.visit("/movies/now-playing")
        })
        it("displays the page header and 20 movies", () => {
            cy.get("h3").contains("Now Playing");
            cy.get(".MuiCardHeader-root").should("have.length", 20);
          });
      
          it("displays the correct movie titles", () => {
            cy.get(".MuiCardHeader-content").each(($card, index) => {
              cy.wrap($card).find("p").contains(nowPlayingMovies[index].title);
            });
          });
    });
    describe("Top Rated Movies list", () => {
        beforeEach(()=>{
            cy.visit("/movies/top-rated")
        })
        it("displays the page header and 20 movies", () => {
            cy.get("h3").contains("Top Rated");
            cy.get(".MuiCardHeader-root").should("have.length", 20);
          });
      
          it("displays the correct movie titles", () => {
            cy.get(".MuiCardHeader-content").each(($card, index) => {
              cy.wrap($card).find("p").contains(topRatedMovies[index].title);
            });
          });
    });
    describe("Trending Movies list", () => {
        beforeEach(()=>{
            cy.visit("/movies/trending")
        })
        it("displays the page header and 20 movies", () => {
            cy.get("h3").contains("Trending Movies");
            cy.get(".MuiCardHeader-root").should("have.length", 20);
          });
      
          it("displays the correct movie titles", () => {
            cy.get(".MuiCardHeader-content").each(($card, index) => {
              cy.wrap($card).find("p").contains(trendingMovies[index].title);
            });
          });
    });
});