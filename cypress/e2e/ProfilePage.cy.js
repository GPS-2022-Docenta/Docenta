describe("Profile page", () => {
  beforeEach("Carga la página de inicio de sesión", () => {
    cy.visit("/login");
  });

  it("Inicia sesión, accede al perfil y cierra sesión", () => {
    cy.get('input[name="nickname"]').type("paulhuszak");
    cy.get('input[name="password"]').type("timer.100AB!");
    cy.get("button").contains("Entrar").click();
    cy.url().should("include", "/catalog");
    cy.visit("/profile");
    cy.get("div").should("exist").contains("Paul");
    cy.get("button").contains("Editar perfil").click();
    cy.get("button").should("exist").contains("Guardar cambios");
    cy.get("button").contains("Cancelar").click();
    cy.get("button").contains("Cerrar sesión").click();
    cy.url().should("include", "/");
  });
});
