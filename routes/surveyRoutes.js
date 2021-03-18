const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Survey = require("../models/Survey");
const Mailer = require("../services/mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

router.get("/api/surveys/:surveyId/:choice", (req, res) => {
  res.send("Thanks for voting!");
});

router.get("/api/surveys", requireLogin, async (req, res) => {
  const surveys = await Survey.find({ user: req.user._id }).select({
    recipients: false,
  });

  res.send(surveys);
});

router.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const recipientsArray = recipients.split(",").map((email) => {
    return { email: email.trim() };
  });

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipientsArray,
    user: req.user._id,
    dateSent: Date.now(),
  });

  const mailer = new Mailer(survey, surveyTemplate(survey));

  try {
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();

    res.send({ user: user, message: "Survey Created successfully!" });
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.post("/api/surveys/webhooks", (req, res) => {
  const p = new Path("/api/surveys/:surveyId/:choice");

  const events = _.chain(req.body)
    .map((event) => {
      const match = p.test(new URL(event.url).pathname);

      if (match) {
        return { email: event.email, ...match };
      }
    })
    .compact()
    .uniqBy("email", "surveyId")
    .each(({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: {
              email: email,
              responded: false,
            },
          },
        },
        {
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true },
          lastResponded: new Date(),
        }
      ).exec();
    })
    .value();

  res.send({});
});

module.exports = router;
