"use strict";
const express = require("express");

const router = express.Router();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

const mySecret = process.env["MONGO_URI"];
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const issueSchema = new mongoose.Schema({
  issue_title: {
    type: String,
    required: true,
  },

  issue_text: {
    type: String,
    required: true,
  },

  created_on: {
    type: Date,
    default: Date.now,
  },

  updated_on: {
    type: Date,
    default: Date.now,
  },

  created_by: {
    type: String,
    required: true,
  },

  assigned_to: {
    type: String,
    default: "",
  },

  open: {
    type: Boolean,
    default: true,
  },

  status_text: {
    type: String,
    default: "",
  },

  project: {
    type: String,
    required: true,
  },
});

let issueData = mongoose.model("issueData", issueSchema);

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      let project = req.params.project;
      const query = req.query;
      query.project = project;
      console.log(req.query);
      issueData
        .find(query)
        .then((list) => {
          const reorderList = list.map((issue) => {
            return {
              _id: issue._id,
              issue_title: issue.issue_title,
              issue_text: issue.issue_text,
              created_on: issue.created_on,
              updated_on: issue.updated_on,
              created_by: issue.created_by,
              assigned_to: issue.assigned_to,
              open: issue.open,
              status_text: issue.status_text,
            };
          });

          res.send(reorderList);
        })
        .catch((error) => {
          console.error("Error retrieving response:", error);
        });
    })

   .post(async (req, res) => {
    try {
        let project = req.params.project;

        // Check for required fields
        if (!req.body.issue_title || !req.body.issue_text || !req.body.created_by) {
            return res.json({ error: "required field(s) missing" });
        }

        const newIssue = new issueData({
            project: project,
            issue_title: req.body.issue_title,
            issue_text: req.body.issue_text,
            created_by: req.body.created_by,
            assigned_to: req.body.assigned_to || '',
            status_text: req.body.status_text || ''
        });

        newIssue.save()
            .then((savedIssue) => {
                console.log("Document inserted successfully :", savedIssue);
                res.json({
                    assigned_to: savedIssue.assigned_to,
                    status_text: savedIssue.status_text,
                    open: savedIssue.open,
                    _id: savedIssue._id,
                    issue_title: savedIssue.issue_title,
                    issue_text: savedIssue.issue_text,
                    created_by: savedIssue.created_by,
                    created_on: savedIssue.created_on,
                    updated_on: savedIssue.updated_on,
                });
            })
            .catch((err) => {
                console.error(err);
                res.json({ error: "could not save new issue" });
            });
    } catch (err) {
        console.error(err);
        res.json({ error: "could not save new issue" });
    }
})

   .put(async (req, res) => {
    try {
        const project = req.params.project;
        const updateFields = {};

        if (!req.body._id) {
            return res.json({ error: "missing _id" });
        }

        if (!mongoose.isValidObjectId(req.body._id)) {
            return res.json({ error: "invalid _id" });
        }

        if (
            !req.body.issue_title &&
            !req.body.issue_text &&
            !req.body.created_by &&
            !req.body.assigned_to &&
            !req.body.status_text &&
            req.body.open === undefined
        ) {
            return res.json({ error: "no update field(s) sent", _id: req.body._id });
        }

        if (req.body.issue_title) {
            updateFields.issue_title = req.body.issue_title;
        }

        if (req.body.issue_text) {
            updateFields.issue_text = req.body.issue_text;
        }

        if (req.body.created_by) {
            updateFields.created_by = req.body.created_by;
        }

        if (req.body.assigned_to) {
            updateFields.assigned_to = req.body.assigned_to;
        }

        if (req.body.status_text) {
            updateFields.status_text = req.body.status_text;
        }

        if (req.body.open !== undefined) {
            updateFields.open = req.body.open;
        }

        updateFields.updated_on = new Date();

        const updatedIssue = await issueData.findByIdAndUpdate(
            req.body._id,
            updateFields,
            { new: true } // This ensures you get the updated document back
        );

        if (!updatedIssue) {
            return res.json({ error: "could not update", _id: req.body._id });
        }

        // Send the success response
        res.json({ result: "successfully updated", _id: req.body._id });
    } catch (err) {
        console.error("Error updating issue:", err);
        res.json({ error: "could not update", _id: req.body._id });
    }
})


 .delete(async (req, res) => {
    try {
        let project = req.params.project;
        let id = req.body._id || req.query._id; // Check both body and query for _id

        if (!id) {
            return res.json({ error: "missing _id" });
        }

        const deletedIssue = await issueData.findByIdAndRemove(id);

        if (!deletedIssue) {
            return res.json({ error: "could not delete", _id: id });
        }

        res.json({ result: "successfully deleted", _id: id });
    } catch (err) {
        console.error(err);
        res.json({ error: "could not delete", _id: req.body._id || req.query._id });
    }
});

};
