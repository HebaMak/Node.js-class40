import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("POST /", () => {
  describe("user enters a cityName", () => {
    it("should response 200 when containing a cityName", async () => {
      const response = await request.post("/weather").send({
        cityName: "Cairo",
      });
      expect(response.statusCode).toBe(200);
    });

    it("content type should be json", async () => {
      const response = await request.post("/weather").send({
        cityName: "Cairo",
      });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });

  describe("when the cityName is empty", () => {
    it("should response 400 when not containing a cityName", async () => {
      const response = await request.post("/weather").send({
        cityName: "jrrivmd",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("weatherText", "City is not found!");
    });

    it("should response 400 when not containing a cityName", async () => {
      const response = await request.post("/weather").send({
        cityName: "",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("weatherText", "City is not found!");
    });
  });
});
