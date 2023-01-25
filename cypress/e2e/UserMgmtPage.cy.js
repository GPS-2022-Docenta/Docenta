describe("User management page", () => {
  beforeEach("Inicia sesión y carga la administración", () => {
    cy.visit("/login");
    cy.get('input[name="nickname"]').type("admin");
    cy.get('input[name="password"]').type("admin.404F!");
    cy.get("button").contains("Entrar").click();
    cy.url().should("include", "/management");
  });

  it("Borra el usuario de la base de datos", () => {
    cy.get("[data-test='course-card']")
      .should("exist")
      .contains("Administrar usuarios")
      .click();
    cy.url().should("include", "/user-management");
    cy.get('input[name="searchBar"]').type("pedropi");
    cy.get("[data-test='user-card']")
      .should("exist")
      .contains("pedropicapiedra");
    cy.get("button").should("exist").contains("Eliminar").click();
    cy.window("div").contains("Sí, ¡elimínalo!").click();
    cy.window("div").contains("El usuario se ha eliminado correctamente.");
    cy.visit("/user-management");
    cy.get("[data-test='back-button']").should("exist").click();
    cy.url().should("include", "/management");
  });
});
