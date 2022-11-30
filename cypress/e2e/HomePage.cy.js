describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-test='menuButton']").should("exist").click();
  });

  it("Carga correctamente", () => {
    cy.get("h1").should("exist").contains("Bienvenido a Docenta");
    cy.get("nav").should("exist");
  });

  it("Carga el inicio de sesión", () => {
    cy.get("[data-test='li-login']").should("exist").contains("Entrar").click();
    cy.url().should("include", "/login");
  });

  it("Carga el catálogo", () => {
    cy.get("[data-test='li-catalog']")
      .should("exist")
      .contains("Catálogo")
      .click();
    cy.url().should("include", "/catalog");
  });
});
