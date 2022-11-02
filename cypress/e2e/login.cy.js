let movies;
describe("User funcitonality", () => {
    
    describe("Login Page", () => {
        it("Should log in and display the home page", () => {
            cy.visit("/login");
            cy.get("h2").contains("Login");
            cy.get(".login__textBox[type='email']").type(`${Cypress.env("EMAIL")}`);
            cy.get(".login__textBox[type='password']").type(`${Cypress.env("PASSWORD")}`);
            cy.get(".login__btn").eq(0).click();
            cy.url().should("include", "movies/home")
        });
        it("Should navigate back to the login page when the Log out button is clicked", () => {
            cy.get("button").contains("Log").click();
            cy.get("button").contains("Log").click();
            cy.url().should("include", `/login`);
        });
    });
    
    describe("Favourite Movie authentication", () => {
        before( () => {
            cy.reload(true)
            cy.request(
                `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
                  "TMDB_KEY"
                )}&language=en-US&include_adult=false&include_video=false&page=1`
              )
                .its("body")
                .then((response) => {
                  movies = response.results;
                });
        })
        it("Should log in, favourite a movie and then view them in the favourites list", () => {
            cy.visit("/login");
            cy.log("Enter Login information");
            cy.get(".login__textBox[type='email']").type(`${Cypress.env("EMAIL")}`);
            cy.get(".login__textBox[type='password']").type(`${Cypress.env("PASSWORD")}`);
            cy.get(".login__btn").eq(0).click();
            cy.url().should("include", `/movies/home`);
            cy.log("Add two movies to the favourites list");
            cy.get("button[aria-label='add to favorites']").eq(0).click();
            cy.get(".MuiCardHeader-root").eq(0).find("svg");
            cy.get("button[aria-label='add to favorites']").eq(1).click();
            cy.get(".MuiCardHeader-root").eq(1).find("svg");
            cy.log("Navigate to the favourites page and check that the correct movies are there")
            cy.get("button").contains("Favorites").click();
            cy.get(".MuiCardHeader-root").should("have.length", 2);
            cy.get(".MuiCardHeader-content")
                .eq(0)
                .find("p")
                .contains(movies[0].title);
            cy.get(".MuiCardHeader-content")
                .eq(1)
                .find("p")
                .contains(movies[1].title);  
        });
        it("Should navigate back to the login page when the Log out button is clicked", () => {
            cy.log("Find the Log Out button and click it")
            cy.get("button").contains("Log").click();
            cy.get("button").contains("Log").click();
            cy.url().should("include", `/login`);
        });
    })
})

