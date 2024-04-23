export const swaggerDocument = 
{
    "openapi": "3.0.3",
    "info": {
      "title": "Swagger Account - OpenAPI 3.0",
      "version": "1.0.11"
    },
    "externalDocs": {
      "url": "http://swagger.io"
    },
    "servers": [
      {
        "url": "http://localhost:3000"
      }
    ],
    "paths": {
      "/account": {
        "put": {
          "tags": [
            "account"
          ],
          "summary": "Update an account",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Account"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/Account"
                }
              },
              "application/x-www-form-urlencoded": {
                "schema": {
                  "$ref": "#/components/schemas/Account"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Account"
                  }
                },
                "application/xml": {
                  "schema": {
                    "$ref": "#/components/schemas/Account"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid ID supplied"
            },
            "404": {
              "description": "Account not found"
            },
            "422": {
              "description": "Validation exception"
            }
          }
        },
        "post": {
          "tags": [
            "account"
          ],
          "summary": "Add a new account",
          "description": "Add a new account",
          "operationId": "addPet",
          "requestBody": {
            "description": "Create a new account",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Account"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/Account"
                }
              },
              "application/x-www-form-urlencoded": {
                "schema": {
                  "$ref": "#/components/schemas/Account"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Account"
                  }
                },
                "application/xml": {
                  "schema": {
                    "$ref": "#/components/schemas/Account"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid input"
            },
            "422": {
              "description": "Validation exception"
            }
          }
        },
        "get": {
          "tags": [
            "account"
          ],
          "summary": "Get accounts",
          "description": "Returns accounts",
          "responses": {
            "200": {
              "description": "successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Account"
                  }
                },
                "application/xml": {
                  "schema": {
                    "$ref": "#/components/schemas/Account"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid ID supplied"
            },
            "404": {
              "description": "Account not found"
            }
          }
        },
        "patch": {
          "tags": [
            "account"
          ],
          "summary": "Update balance",
          "description": "Update balance",
          "requestBody": {
            "description": "Update balance",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Account"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/Account"
                }
              },
              "application/x-www-form-urlencoded": {
                "schema": {
                  "$ref": "#/components/schemas/Account"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "Successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Account"
                  }
                },
                "application/xml": {
                  "schema": {
                    "$ref": "#/components/schemas/Account"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid input"
            },
            "422": {
              "description": "Validation exception"
            }
          }
        }
      },
      "/account/{id}": {
        "get": {
          "tags": [
            "account"
          ],
          "summary": "Find account by ID",
          "description": "Returns a single account",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "ID of account to return",
              "required": true,
              "schema": {
                "type": "integer",
                "format": "int64"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "successful operation",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Account"
                  }
                },
                "application/xml": {
                  "schema": {
                    "$ref": "#/components/schemas/Account"
                  }
                }
              }
            },
            "400": {
              "description": "Invalid ID supplied"
            },
            "404": {
              "description": "Account not found"
            }
          }
        },
        "delete": {
          "tags": [
            "account"
          ],
          "summary": "Delete account",
          "description": "delete account",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Account id to delete",
              "required": true,
              "schema": {
                "type": "integer",
                "format": "int64"
              }
            }
          ],
          "responses": {
            "400": {
              "description": "Invalid account value"
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "Account": {
          "required": [
            "name",
            "balance"
          ],
          "type": "object",
          "properties": {
            "id": {
              "type": "integer",
              "format": "int64",
              "example": 10
            },
            "name": {
              "type": "string",
              "example": "Maria"
            },
            "balance": {
              "type": "integer",
              "format": "int64",
              "example": 10
            }
          },
          "xml": {
            "name": "account"
          }
        }
      },
      "requestBodies": {
        "Account": {
          "description": "Account object that needs to be added to the store",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Account"
              }
            },
            "application/xml": {
              "schema": {
                "$ref": "#/components/schemas/Account"
              }
            }
          }
        }
      }
    }
  };