export const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Capstone Project;",
        description: "This is a backend APIs for Capstone project",
        version: "1.0.0",
        contact: {
          name: "MUHETO Hodal",
          email: "mhthodol@gmail.com",
          url: "https://www.linkedin.com/in/muheto-hodal-23311a211/",
        },
      },
      servers: [
        {
          url: "http://localhost:9000",
          name: "Local server",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };