describe("Catalog page", () => {
  beforeEach("Carga correctamente los cursos", () => {
    cy.visit("/catalog");
    cy.request("https://docenta-api.vercel.app/courses").then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Filtra los cursos mediante la barra de búsqueda", () => {
    cy.get('input[name="searchBar"]').type("gest");
    cy.get("[data-test='course-card']")
      .should("exist")
      .contains("Gestión de Proyecto Software");
  });
});
