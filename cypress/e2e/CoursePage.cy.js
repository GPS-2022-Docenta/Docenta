describe("Course page", () => {
  beforeEach("Inicia sesión y carga el catálogo", () => {
    cy.visit("/login");
    cy.get('input[name="nickname"]').type("paulhuszak");
    cy.get('input[name="password"]').type("timer.100AB!");
    cy.get("button").contains("Entrar").click();
    cy.url().should("include", "/catalog");
  });

  it("Añade el curso a favoritos", () => {
    cy.request("https://docenta-api.vercel.app/courses").then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.get('input[name="searchBar"]').type("photo");
    cy.get("[data-test='course-card']")
      .should("exist")
      .contains("Introducción a Adobe Photoshop");
    cy.get("a").should("exist").contains("Ver más").click();
    cy.url().should("include", "/catalog/10");
    cy.get("div").should("exist").contains("Introducción a Adobe Photoshop");
    cy.request("https://docenta-api.vercel.app/courses/10").then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.get("button").should("exist").contains("Añadir a favoritos").click();
    cy.window("div").contains("Curso añadido correctamente.");
  });

  it("Actualiza el progreso del curso", () => {
    cy.visit("/favorites");
    cy.get('input[name="searchBar"]').type("photo");
    cy.get("[data-test='course-card']")
      .should("exist")
      .contains("Introducción a Adobe Photoshop");
    cy.get("a").should("exist").contains("Ver más").click();
    cy.url().should("include", "/favorites/10");
    cy.get("div").should("exist").contains("Introducción a Adobe Photoshop");
    cy.request("https://docenta-api.vercel.app/favoritos/paulhuszak/10").then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
    cy.get("button").should("exist").contains("Actualizar progreso").click();
    cy.window("div").contains("¡Actualiza el progreso del curso!");
    cy.get('input[name="progress"]').type("20");
    cy.get('button[name="progress-update"]').click();
    cy.window("div").contains("El progreso ha sido actualizado correctamente.");
    cy.get("div").should("exist").contains("20");
  });

  it("Borra el curso de favoritos", () => {
    cy.visit("/favorites");
    cy.get('input[name="searchBar"]').type("photo");
    cy.get("[data-test='course-card']")
      .should("exist")
      .contains("Introducción a Adobe Photoshop");
    cy.get("a").should("exist").contains("Ver más").click();
    cy.url().should("include", "/favorites/10");
    cy.get("div").should("exist").contains("Introducción a Adobe Photoshop");
    cy.request("https://docenta-api.vercel.app/favoritos/paulhuszak/10").then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
    cy.get("[data-test='del-button']").should("exist").click();
    cy.window("div").contains("Sí, ¡elimínalo!").click();
    cy.window("div").contains("El curso se ha eliminado correctamente.");
    cy.url().should("include", "/favorites");
  });
});
