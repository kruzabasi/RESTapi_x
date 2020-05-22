require("should");
const request = require("supertest");
const mongoose = require("mongoose");

process.env.ENV = "Test";

const app = require("../app");

const Book = mongoose.model("Book");
const agent = request.agent(app);

describe("Book Crud Test", () => {
  it("Should Allow a Book to be Posted and Return and Read and _Id", done => {
    const bookPost = {
      title: "Siprited Away",
      author: "Su Ji Twain",
      genre: "Manga"
    };
    agent
      .post("/api/books")
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        //console.log(results);
        //results.body.read.should.not.equal(false);
        results.body.should.have.property("_id");
        done();
      });
  });
  afterEach(done => {
    Book.deleteMany({}).exec();
    done();
  });
  after(done => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
