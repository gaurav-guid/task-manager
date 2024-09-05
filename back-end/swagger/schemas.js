const schemas = {
  UserLogin: {
    type: "object",
    properties: {
      email: {
        type: "string",
        description: "The user's email",
      },
      password: {
        type: "string",
        description: "The user's password",
      },
    },
    required: ["email", "password"],
  },
  UserRegister: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "The user's name",
      },
      email: {
        type: "string",
        description: "The user's email",
      },
      password: {
        type: "string",
        description: "The user's password",
      },
    },
    required: ["name", "email", "password"],
  },
};

module.exports = schemas;
