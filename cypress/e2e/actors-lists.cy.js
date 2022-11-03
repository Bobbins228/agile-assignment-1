import { filterByName } from "../support/e2e";
let actors;
let popularActor;
let creditedMovies;
let trendingActors;
describe("Actors lists tests", () =>{
    beforeEach(()=>{
        //Requests list of popular actors
        cy.request(
            `https://api.themoviedb.org/3/person/popular?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&page=1`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                actors = response.results;
            });
        //Requests list of trending actors
        cy.request(
            `https://api.themoviedb.org/3/trending/person/week?api_key=${Cypress.env(
                "TMDB_KEY"
            )}`
        )
            .its("body") // Take the body of HTTP response from TMDB
            .then((response) => {
                trendingActors = response.results;
            });
        
    });
    describe("Popular actors list", () => {
        beforeEach(()=>{
            //Get list of a popular actor's credited movies
            cy.request(
                `https://api.themoviedb.org/3/person/${
                  actors[1].id
                }/movie_credits?api_key=${Cypress.env("TMDB_KEY")}`
              )
                .its("body")
                .then((actorMovies) => {
                    creditedMovies = actorMovies.cast;
                });
            //Get popular actor details
            cy.request(
                `https://api.themoviedb.org/3/person/${
                    actors[1].id
                }?api_key=${Cypress.env("TMDB_KEY")}`
                )
                .its("body")
                .then((response) => {
                    popularActor = response;
                });
            cy.visit("/people")
        })
        it("displays the page header and 20 actors", () => {
            cy.get("h3").contains("Popular Actors");
            cy.get(".MuiCardHeader-root").should("have.length", 20);
          });
      
          it("displays the correct actor names", () => {
            cy.get(".MuiCardHeader-content").each(($card, index) => {
              cy.wrap($card).find("p").contains(actors[index].name);
            });
          });
        describe("Popular Actor Details", () =>{
            beforeEach(()=>{
                cy.visit(`/people/${actors[1].id}`);
            });
            it("Should display the movies that the actor has been in", () =>{
                cy.visit(`/people/${actors[1].id}`);
                cy.get(".MuiCardHeader-content").each(($card, index) => {
                    cy.wrap($card).find("p").contains(creditedMovies[index].title);
                  });
            });
            it("Should display the actor's biograpy", () =>{
                cy.visit(`/people/${actors[1].id}`);
                cy.get("p").eq(0).contains(popularActor.biography)
            });
        })
    });
    describe("Trending actors list", () => {
        beforeEach(()=>{
            //Requests list of trending actors
            cy.request(
                `https://api.themoviedb.org/3/person/${
                  trendingActors[1].id
                }/movie_credits?api_key=${Cypress.env("TMDB_KEY")}`
              )
                .its("body")
                .then((actorMovies) => {
                    creditedMovies = actorMovies.cast;
                });
            cy.visit("/people/trending")
        })
        it("displays the page header and 20 actors", () => {
            cy.get("h3").contains("Trending Actors");
            cy.get(".MuiCardHeader-root").should("have.length", 20);
          });
      
          it("displays the correct actor names", () => {
            cy.get(".MuiCardHeader-content").each(($card, index) => {
              cy.wrap($card).find("p").contains(trendingActors[index].name);
            });
          });
          describe("Searching for actors by name", ()=> {
            it("only display trending actors with 'c' in their name", () => {
                const searchString = "c";
                const matchingActors = filterByName(trendingActors, searchString);
                cy.get("#filled-search").clear().type(searchString); // Enter m in text box
                cy.get(".MuiCardHeader-content").should(
                  "have.length",
                  matchingActors.length
                );
                cy.get(".MuiCardHeader-content").each(($card, index) => {
                  cy.wrap($card).find("p").contains(matchingActors[index].name);
                });
              });
              it("handles case when there are no matches", () => {
                const searchString = "xyxxzyyzz";
                cy.get("#filled-search").clear().type(searchString); // Enter m in text box
                cy.get(".MuiCardHeader-content").should("have.length", 0);
              });
          })
          describe("Trending Actor Details", () =>{
            beforeEach(()=>{
                cy.visit(`/people/${trendingActors[1].id}`);
            });
            it("Should display the movies that the actor has been in", () =>{
                cy.visit(`/people/${trendingActors[1].id}`);
                cy.get(".MuiCardHeader-content").each(($card, index) => {
                    cy.wrap($card).find("p").contains(creditedMovies[index].title);
                  });
            });
        })
    });
    
});