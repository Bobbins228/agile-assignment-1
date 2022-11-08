describe("Logged out user tests ", () => {
  
    describe("Favourites authentication", () => { 
      it("Should navigate to the log in page if a user who is not logged in favourites a movie", () => {
            cy.visit("/movies/home");
            cy.wait(300)
            cy.get("button[aria-label='add to favorites']").eq(1).click();
            cy.log('Clicked the add to favourites button which should send the user to the log in page');
            cy.url().should("include", "/login")
        });
    })
    
    describe("The site header", () => {
        beforeEach(() => {
            cy.visit("/movies/home");
        })
        it("Should navigate back to the login page when the Log out button is clicked", () => {
            cy.get("button").contains("Log").click();
            cy.log('Logged out user should be sent to login page')
            cy.url().should("include", `/login`);
            
        });
        it("Should navigate back to the login page when the favourites button is clicked", () => {
            cy.get("button").contains("Favorites").click();
            cy.log('Logged out user should be sent to login page after clicking favorites button');
            cy.url().should("include", `/login`);
        });
    describe(
        "when the viewport is a mobile scale",
        {
          viewportHeight: 896,
          viewportWidth: 414,
        },
        () => {
          it("navigation back to the login page when the Log out button is clicked via the dropdown menu", () => {
            cy.get("header").find("button").click();
            cy.get("li").contains('Log').click();
            cy.log('Logged out user should be sent to login page');
            cy.url().should("include", `/login`);
          });
          it("navigation back to the login page when the favourites button is clicked via the dropdown menu", () => {
            cy.get("header").find("button").click();
            cy.get("li").contains('Favorites').click();
            cy.log('Logged out user should be sent to login page after clicking favorites button');
            cy.url().should("include", `/login`);
          });
        }
      );
    });
});