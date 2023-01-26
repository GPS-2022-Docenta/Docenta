describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-test='menuButton']").should("exist").click();
  });

  it("Carga correctamente", () => {
    cy.get("h1").should("exist").contains("Bienvenido a Docenta");
    cy.get("nav").should("exist");
  });

  it("Carga el inicio de sesión", () => {
    cy.get("[data-test='li-login']").should("exist").contains("Entrar").click();
    cy.url().should("include", "/login");
  });

  it("Carga el catálogo", () => {
    cy.get("[data-test='li-catalog']")
      .should("exist")
      .contains("Catálogo")
      .click();
    cy.url().should("include", "/catalog");
  });

  it("Carga página no encontrada", () => {
    cy.visit("/*");
    cy.get("div").should("exist").contains("Algo no ha ido bien...");
    cy.get("[data-test='back-button']").should("exist").click();
    cy.url().should("include", "/");
  });
});

describe("Register page", () => {
  beforeEach("Carga la página de registro", () => {
    cy.visit("/register");
  });

  it("Redirige a inicio de sesión", () => {
    cy.get("a").should("exist").contains("Inicia sesión").click();
    cy.url().should("include", "/login");
  });
});

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
    cy.get('input[name="email"]').type("pedropicapiedra3@gmail.com");
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
    cy.url().should("include", "/catalog");
  });
});

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
