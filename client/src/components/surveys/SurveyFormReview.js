import _ from "lodash";
import { connect } from "react-redux";
import { Button, Container } from "react-bootstrap";
import FIELDS from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(FIELDS, (field) => {
    return (
      <div key={field.name} style={{ marginTop: "20px" }}>
        <label>{field.label}:</label>
        <div style={{ fontWeight: "bold" }}>{formValues[field.name]}</div>
      </div>
    );
  });

  return (
    <Container style={{ marginTop: "100px", padding: "50px" }}>
      <h3>Please confirm your entries</h3>
      {reviewFields}
      <div style={{ marginTop: "20px" }}>
        <Button variant="warning" onClick={onCancel} style={{ float: "left" }}>
          <i style={{ marginRight: "10px" }} className="fas fa-arrow-left"></i>
          Back
        </Button>
        <Button
          variant="success"
          onClick={() => submitSurvey(formValues, history)}
          style={{ float: "right" }}
        >
          Send Survey
          <i style={{ marginLeft: "10px" }} className="fas fa-share"></i>
        </Button>
      </div>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values,
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
