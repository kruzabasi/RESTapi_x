const should = require("should");
const sinon = require("sinon");
const bookControler = require("../controllers/bookController");

describe("Book Controller Tests", () => {
  describe("Post", () => {
    it("Should Not Allow Empty Titles", () => {
      const Book = function(book) {
        this.save = () => {};
      };
      const req = { body: { author: "Jon" } };
      const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

      const controller = bookControler(Book);
      controller.post(req, res);

      res.status
        .calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith("Title is Required").should.equal(true);
    });
  });
});
