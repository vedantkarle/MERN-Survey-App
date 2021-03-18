import { Form } from "react-bootstrap";

const SurveyField = ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          style={{ border: `${touched && error ? "1.5px solid crimson" : ""}` }}
          {...input}
        />
        <div style={{ color: "crimson", marginTop: "5px", fontSize: "13px" }}>
          {touched && error}
        </div>
      </Form.Group>
    </div>
  );
};

export default SurveyField;
