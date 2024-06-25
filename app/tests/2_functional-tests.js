const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("Tests for /api/issues/{project}", function () {
    /* Test 1: Create an issue with every field */
    test("Create an issue with every field: POST request", function (done) {
      chai
        .request(server)
        .post("/api/issues/projects")
        .send({
          issue_title: "title",
          issue_text: "text",
          created_by: "cm",
          assigned_to: "cm",
          status_text: "text 2",
          open: true,
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, "title");
          assert.equal(res.body.issue_text, "text");
          assert.equal(res.body.created_by, "cm");
          assert.equal(res.body.assigned_to, "cm");
          assert.equal(res.body.status_text, "text 2");
          assert.equal(res.body.open, true);

          done();
        });
    });

    /* Test 2: Create an issue with only required fields */
    test("Create an issue with only required fields: POST request", function (done) {
      chai
        .request(server)
        .post("/api/issues/projects")
        .send({
          issue_title: "Issue",
          issue_text: "Functional Test",
          created_by: "fCC",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, "Issue");
          assert.equal(res.body.issue_text, "Functional Test");
          assert.equal(res.body.created_by, "fCC");
          assert.equal(res.body.assigned_to, ""); // default value
          assert.equal(res.body.status_text, ""); // default value

          done();
        });
    });

    /* Test 3: Create an issue with missing required fields */
    test("Create an issue with missing required fields: POST request", function (done) {
      chai
        .request(server)
        .post("/api/issues/projects")
        .send({
          assigned_to: "User",
          status_text: "In progress",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "required field(s) missing");

          done();
        });
    });

    /* Test 4: View issues on a project */
    test("View issues on a project: GET request", function (done) {
      chai
        .request(server)
        .get("/api/issues/projects")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          // Assuming it returns an array of issues
          assert.isArray(res.body);
          assert.isAtLeast(res.body.length, 1); // Adjust as per expected data

          done();
        });
    });

    /* Test 5: View issues on a project with one filter */
    test("View issues on a project with one filter: GET request", function (done) {
      chai
        .request(server)
        .get("/api/issues/projects")
        .query({ created_by: "fCC" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          // Assert specific filter criteria
          assert.isArray(res.body);
          assert.isAtLeast(res.body.length, 1); // Adjust as per expected data

          done();
        });
    });

    /* Test 6: View issues on a project with multiple filters */
    test("View issues on a project with multiple filters: GET request", function (done) {
      chai
        .request(server)
        .get("/api/issues/projects")
        .query({ created_by: "fCC", open: true })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          // Assert specific filter criteria
          assert.isArray(res.body);
          assert.isAtLeast(res.body.length, 1); // Adjust as per expected data

          done();
        });
    });

   /* Test 7: Update one field on an issue */
test("Update one field on an issue: PUT request", function (done) {
  chai
    .request(server)
    .put("/api/issues/projects")
    .send({
      _id: "66796ca36154966a009e52b3", // Replace with a valid ID from your database
      issue_title: "Updated Title",
    })
    .end(function (err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.result, "successfully updated");
      assert.equal(res.body._id, "66796ca36154966a009e52b3");

      done();
    });
});

/* Test 8: Update multiple fields on an issue */
test("Update multiple fields on an issue: PUT request", function (done) {
  chai
    .request(server)
    .put("/api/issues/projects")
    .send({
      _id: "66796ca36154966a009e52b3", // Replace with a valid ID from your database
      issue_title: "Updated Title",
      issue_text: "Updated Text",
    })
    .end(function (err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.result, "successfully updated");
      assert.equal(res.body._id, "66796ca36154966a009e52b3");

      done();
    });
});

    /* Test 9: Update an issue with missing _id */
    test("Update an issue with missing _id: PUT request", function (done) {
      chai
        .request(server)
        .put("/api/issues/projects")
        .send({
          issue_title: "Updated Title",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "missing _id");

          done();
        });
    });

    /* Test 10: Update an issue with no fields to update */
    test("Update an issue with no fields to update: PUT request", function (done) {
      chai
        .request(server)
        .put("/api/issues/projects")
        .send({
          _id: "646aa0dfeca0082252d7e616",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "no update field(s) sent");

          done();
        });
    });

    /* Test 11: Update an issue with an invalid _id */
   test("Update an issue with an invalid _id: PUT request", function (done) {
  chai
    .request(server)
    .put("/api/issues/projects")
    .send({
      _id: "667156262726278906524563", // Invalid _id used intentionally
      issue_title: "Updated Title",
    })
    .end(function (err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.error, "could not update");

      done();
    });
});


    /* Test 12: Delete an issue */
   test("Delete an issue: DELETE request", function (done) {
  chai
    .request(server)
    .delete("/api/issues/projects")
    .send({
      _id: "667b56a959692600c0137c37", // Valid _id from your database
    })
    .end(function (err, res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.result, "successfully deleted");
      assert.equal(res.body._id, "667b56a959692600c0137c37");

      done();
    });
});


    /* Test 13: Delete an issue with an invalid _id */
    test("Delete an issue with an invalid _id: DELETE request", function (done) {
      chai
        .request(server)
        .delete("/api/issues/projects")
        .send({
          _id: "invalid_id",
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "could not delete");

          done();
        });
    });

    /* Test 14: Delete an issue with missing _id */
    test("Delete an issue with missing _id: DELETE request", function (done) {
      chai
        .request(server)
        .delete("/api/issues/projects")
        .send({})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "missing _id");

          done();
        });
    });
  });
});
