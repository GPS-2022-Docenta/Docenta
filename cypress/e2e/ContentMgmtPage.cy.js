describe("Content management page", () => {
  beforeEach("Inicia sesión y carga la administración", () => {
    cy.visit("/login");
    cy.get('input[name="nickname"]').type("admin");
    cy.get('input[name="password"]').type("admin.404F!");
    cy.get("button").contains("Entrar").click();
    cy.url().should("include", "/management");
  });

  it("Campos vacíos", () => {
    cy.get("[data-test='course-card']")
      .should("exist")
      .contains("Administrar contenido")
      .click();
    cy.url().should("include", "/content-management");
    cy.get("button").should("exist").contains("Añadir").click();
    cy.url().should("include", "/add-course");
    cy.get("button").contains("Añadir").click();
    cy.window("div").contains("Los campos no pueden estar vacíos.");
  });

  it("Añade el curso a la base de datos", () => {
    cy.get("[data-test='course-card']")
      .should("exist")
      .contains("Administrar contenido")
      .click();
    cy.url().should("include", "/content-management");
    cy.get("button").should("exist").contains("Añadir").click();
    cy.url().should("include", "/add-course");
    cy.get('input[id="name"]').type(
      "Google UX Design Professional Certificate"
    );
    cy.get('input[id="category"]').type("Arte");
    cy.get('input[id="description"]').type(
      "This is your path to a career in UX design. In this program, you’ll learn in-demand skills that will have you job-ready in less than 6 months. No degree or experience required."
    );
    cy.get('input[id="image"]').type(
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/xdp/decisionCriteriaBannerLogos/google-ux-design.png?auto=format%2Ccompress&dpr=1&w=&h=260"
    );
    cy.get('input[id="link"]').type(
      "www.coursera.org/professional-certificates/google-ux-design"
    );
    cy.get('input[id="author"]').type("Google");
    cy.get('input[id="platform"]').type("Coursera");
    cy.get("button").contains("Añadir").click();
    cy.window("div").contains("Curso añadido correctamente.");
    cy.url().should("include", "/content-management");
  });

  it("Intenta añadir un curso ya existente", () => {
    cy.get("[data-test='course-card']")
      .should("exist")
      .contains("Administrar contenido")
      .click();
    cy.url().should("include", "/content-management");
    cy.get("button").should("exist").contains("Añadir").click();
    cy.url().should("include", "/add-course");
    cy.get('input[id="name"]').type(
      "Google UX Design Professional Certificate"
    );
    cy.get('input[id="category"]').type("Arte");
    cy.get('input[id="description"]').type(
      "This is your path to a career in UX design. In this program, you’ll learn in-demand skills that will have you job-ready in less than 6 months. No degree or experience required."
    );
    cy.get('input[id="image"]').type(
      "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/xdp/decisionCriteriaBannerLogos/google-ux-design.png?auto=format%2Ccompress&dpr=1&w=&h=260"
    );
    cy.get('input[id="link"]').type(
      "www.coursera.org/professional-certificates/google-ux-design"
    );
    cy.get('input[id="author"]').type("Google");
    cy.get('input[id="platform"]').type("Coursera");
    cy.get("button").contains("Añadir").click();
    cy.window("div").contains("Ya existe un curso con ese nombre.");
  });

  it("Borra el curso de la base de datos", () => {
    cy.get("[data-test='course-card']")
      .should("exist")
      .contains("Administrar contenido")
      .click();
    cy.url().should("include", "/content-management");
    cy.get('input[name="searchBar"]').type("google ux");
    cy.get("[data-test='course-card']")
      .should("exist")
      .contains("Google UX Design");
    cy.get("button").should("exist").contains("Eliminar").click();
    cy.window("div").contains("Sí, ¡elimínalo!").click();
    cy.window("div").contains("El curso se ha eliminado correctamente.");
    cy.visit("/content-management");
    cy.get("[data-test='back-button']").should("exist").click();
    cy.url().should("include", "/management");
  });
});
