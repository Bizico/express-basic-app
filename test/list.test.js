import request from "request";

describe("GET /user", function() {
  it("respond with json", function(done) {
    request(app)
      .get("/user")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
