describe("Forgot password page", () => {
  beforeEach("Carga la página de recuperación de contraseña", () => {
    cy.visit("/forgot-passwd");
  });

  it("Redirige a inicio de sesión", () => {
    cy.get("a").should("exist").contains("Volver").click();
    cy.url().should("include", "/login");
  });

  it("Introducir campos vacíos en el formulario", () => {
    cy.get("button").contains("Enviar").click();
    cy.window("div").contains("Los campos no pueden estar vacíos.");
  });

  it("Introducir campos incorrectos en el formulario", () => {
    cy.get('input[name="email"]').type("pedropicapiedra@gmail.com");
    cy.get("button").contains("Enviar").click();
    cy.window("div").contains(
      "El correo introducido no está asociado a ninguna cuenta."
    );
  });

  it("Introducir campos correctos en el formulario", () => {
    cy.get('input[name="email"]').type("paulhuszak@gmail.com");
    cy.get("button").contains("Enviar").click();
    cy.window("div").contains(
      "Se ha enviado un enlace a de recuperación de contraseña."
    );
  });
});

describe("Restore password page", () => {
  beforeEach("Carga la página de restauración de contraseña", () => {
    cy.visit("/restore-passwd");
  });

  it("Introducir campos vacíos en el formulario", () => {
    cy.get("button").contains("Enviar").click();
    cy.window("div").contains("Los campos no pueden estar vacíos.");
  });

  it("Introducir campos correctos en el formulario", () => {
    cy.get('input[name="password"]').type("timer.100ABC!");
    cy.get('input[name="cpassword"]').type("timer.100ABC!");
    cy.get("button").contains("Enviar").click();
    cy.window("div").contains(
      "Tu contraseña ha sido restaurada correctamente."
    );
  });
});
