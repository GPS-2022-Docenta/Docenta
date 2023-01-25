describe("Dashboard page", () => {
  beforeEach("Inicia sesión y carga la administración", () => {
    cy.visit("/login");
    cy.get('input[name="nickname"]').type("admin");
    cy.get('input[name="password"]').type("admin.404F!");
    cy.get("button").contains("Entrar").click();
    cy.url().should("include", "/management");
  });

  it("Accede a las estadísticas", () => {
    cy.get("[data-test='course-card']")
      .should("exist")
      .contains("Mostrar estadísticas")
      .click();
    cy.url().should("include", "/dashboard");
    cy.get("[data-test='course-card']")
      .should("exist")
      .contains("Usuarios registrados");
    cy.get("[data-test='course-card']")
      .should("exist")
      .contains("Ratio hombres/mujeres");
    cy.get("[data-test='course-card']")
      .should("exist")
      .contains("Top 3 países más registrados");
    cy.get("[data-test='course-card']")
      .should("exist")
      .contains("Top 3 cursos más gustados");
    cy.get("[data-test='back-button']").should("exist").click();
    cy.url().should("include", "/management");
  });
});
