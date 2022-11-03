let upcomingMovies; 
let nowPlayingMovies;
let topRatedMovies;
let trendingMovies;
let movies;
let similarMovies;
let recommendedMovies;
let movie;
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
   
    describe("Movies Details page", () => {
        beforeEach(()=>{
        
        // Get Movie details from a movie from the discover movies list
        cy.request(
            `https://api.themoviedb.org/3/movie/${
              movies[1].id
            }?api_key=${Cypress.env("TMDB_KEY")}`
          )
            .its("body")
            .then((movieDetails) => {
              movie = movieDetails;
            });
        // Get similar movies from TMDB using the movie id and store them locally.
        cy.request(
            `https://api.themoviedb.org/3/movie/${movies[1].id}/similar?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                similarMovies = response.results;
            });
        // Get recommended movies from TMDB using the movie id and store them locally.
        cy.request(
            `https://api.themoviedb.org/3/movie/${movies[1].id}/recommendations?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                recommendedMovies = response.results;
            });

            
        cy.visit(`/movies/${movies[1].id}`);
        });
        describe("Similar movies list", () => {
            it("displays the page header and 20 movies", () => {
                cy.get("h3").contains("Similar Movies");
                cy.get(".css-11p3tde-MuiGrid-root").eq(2).find(".MuiCardHeader-content").should("have.length", 20);
              });
          
              it("displays the correct movie titles", () => {
                cy.get(".css-11p3tde-MuiGrid-root").eq(2).find(".MuiCardHeader-content").each(($card, index) => {
                  cy.wrap($card).find("p").contains(similarMovies[index].title);
                });
              });
        });
        describe("Recommended movies list", () => {
            it("displays the page header and show the correct number of movies", () => {
                cy.get("h3").contains("Recommended Movies");
                // The recommended movies shows more than 20 movies so we get the number of movies by using the recommendedMovies variable
                cy.get(".css-11p3tde-MuiGrid-root").eq(1).find(".MuiCardHeader-content").should("have.length", recommendedMovies.length);
              });
          
              it("displays the correct movie titles", () => {
                cy.get(".css-11p3tde-MuiGrid-root").eq(1).find(".MuiCardHeader-content").each(($card, index) => {
                  cy.wrap($card).find("p").contains(recommendedMovies[index].title);
                });
              });
        });
    });
});