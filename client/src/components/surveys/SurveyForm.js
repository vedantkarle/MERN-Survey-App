import _ from "lodash";
import React from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import FIELDS from "./formFields";

class SurveyForm extends React.Component {
  renderFields() {
    return _.map(FIELDS, (field) => {
      return (
        <Field
          key={field.name}
          component={SurveyField}
          type="text"
          label={field.label}
          name={field.name}
        />
      );
    });
  }

  render() {
    return (
      <Container style={{ marginTop: "100px", padding: "50px" }}>
        <h1 style={{ textAlign: "center" }}>Create New Survey</h1>
        <Form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Button variant="danger">
            <Link to="/surveys" style={{ float: "left" }}>
              <i
                style={{ marginRight: "10px" }}
                className="far fa-window-close"
              ></i>
              Cancel
            </Link>
          </Button>
          <Button variant="success" type="submit" style={{ float: "right" }}>
            Next
            <i
              style={{ marginLeft: "10px" }}
              className="fas fa-arrow-right"
            ></i>
          </Button>
        </Form>
      </Container>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
