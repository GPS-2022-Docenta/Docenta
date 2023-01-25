describe("Catalog page", () => {
  beforeEach("Carga correctamente los cursos", () => {
    cy.visit("/catalog");
    cy.request("https://docenta-api.vercel.app/courses").then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Ordena los cursos por criterio", () => {
    cy.get("[data-test='order-btn']")
      .should("exist")
      .contains("Ordenar")
      .click();
    cy.get("[data-test='attribute']").should("exist").contains("Atributo");
    cy.get("[data-test='order-name']").should("exist").contains("Nombre");
    cy.get("[data-test='order-author']").should("exist").contains("Autor");
    cy.get("[data-test='order-platform']")
      .should("exist")
      .contains("Plataforma");
    cy.get("[data-test='order-default']")
      .should("exist")
      .contains("Por defecto (ID)");
  });

  it("Prueba los botones de volver, cargar más y subir arriba", () => {
    cy.get("[data-test='more-button']").should("exist").click();
    cy.get("[data-test='course-card']")
      .should("exist")
      .contains("Papelería ilustrada: guía para comercializar tu arte");
    cy.get("[data-test='top-button']").should("exist").click();
    cy.scrollTo("top");
    cy.get("[data-test='back-button']").should("exist");
  });

  it("Filtra los cursos mediante la barra de búsqueda y accede a su información", () => {
    cy.get('input[name="searchBar"]').type("google data");
    cy.get("[data-test='course-card']")
      .should("exist")
      .contains("Google Data Analytics Professional Certificate");
    cy.get("a").should("exist").contains("Ver más").click();
    cy.url().should("include", "/catalog/56");
    cy.get("div")
      .should("exist")
      .contains("Google Data Analytics Professional Certificate");
    cy.request("https://docenta-api.vercel.app/courses/56");
    cy.get("button").should("exist").contains("Ir al curso").click();
    cy.origin("/catalog/56", () => {
      cy.visit(
        "https://www.coursera.org/professional-certificates/google-data-analytics?"
      );
    });
  });
});
