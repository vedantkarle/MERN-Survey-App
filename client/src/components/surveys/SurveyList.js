import React from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";
import { Card, Container, ProgressBar } from "react-bootstrap";

class SurveyList extends React.Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    if (this.props.surveys) {
      return this.props.surveys.reverse().map((survey, index) => {
        let width = ((survey.yes * 1) / (survey.yes * 1 + survey.no * 1)) * 100;

        console.log(width);

        return (
          <Card key={survey._id} style={{ marginTop: "20px" }}>
            <Card.Header>Survey #{index + 1}</Card.Header>
            <Card.Body>
              <Card.Title>{survey.title}</Card.Title>
              <Card.Text>{survey.body}</Card.Text>
              <br />
              {survey.yes || survey.no ? (
                <ProgressBar
                  now={width}
                  label={`YES ${width}%`}
                  variant="success"
                />
              ) : (
                "No Responses Yet"
              )}
            </Card.Body>
            <Card.Footer className="text-muted">
              Sent On:{new Date(survey.dateSent).toLocaleDateString()}
            </Card.Footer>
          </Card>
        );
      });
    } else if (!this.props.surveys) {
      return <div>You dont have any surveys</div>;
    }
    return <div>Loading...</div>;
  }

  render() {
    return (
      <Container style={{ marginTop: "140px" }}>
        <h4>Your Surveys</h4>
        {this.renderSurveys()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return { surveys: state.survey.surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
