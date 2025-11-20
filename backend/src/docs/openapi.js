module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Users API (Assignment 8)",
      version: "1.0.0",
      description: "Secure RESTful APIs for user management and image upload",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["src/docs/routes.yaml"],
};
