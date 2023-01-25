describe("Register page", () => {
  beforeEach("Carga la página de registro", () => {
    cy.visit("/register");
  });

  it("Redirige a inicio de sesión", () => {
    cy.get("a").should("exist").contains("Inicia sesión").click();
    cy.url().should("include", "/login");
  });
});
