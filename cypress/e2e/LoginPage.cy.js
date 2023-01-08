describe("Login page", () => {
  beforeEach("Carga la página de inicio de sesión", () => {
    cy.visit("/login");
  });

  it("Redirige a registro", () => {
    cy.get("a").should("exist").contains("Regístrate").click();
    cy.url().should("include", "/register");
  });

  it("Redirige a recuperación de contraseña", () => {
    cy.get("a")
      .should("exist")
      .contains("¿Has olvidado tu contraseña?")
      .click();
    cy.url().should("include", "/forgot-passwd");
  });

  it("Introducir campos vacíos en el formulario", () => {
    cy.get("button").contains("Entrar").click();
    cy.window("div").contains("Los campos no pueden estar vacíos.");
  });

  it("Introducir campos incorrectos en el formulario", () => {
    cy.get('input[name="nickname"]').type("pedropicapiedra");
    cy.get('input[name="password"]').type("pedro1234");
    cy.get("button").contains("Entrar").click();
    cy.window("div").contains("Usuario o contraseña incorrecto.");
  });

  it("Introducir campos correctos en el formulario", () => {
    cy.get('input[name="nickname"]').type("paulhuszak");
    cy.get('input[name="password"]').type("timer.100AB!");
    cy.get("button").contains("Entrar").click();
    cy.url().should("include", "/profile");
  });

  it("Cierra sesión tras llegar al perfil", () => {
    cy.visit("/profile");
    cy.get("button").contains("Cerrar sesión").click();
    cy.url().should("include", "/");
  });
});
