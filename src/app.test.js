const request = require("supertest");
const app = require("./app");
const gridRouter = require("./route/gridRoutes");

describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request.agent(app)
      .get("/grid")
      .set("user-uuid", "cabeee00-afad-44ef-9028-0bd1f813521b")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});