import { connect } from "react-redux";
import { Jumbotron, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Landing = ({ auth }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "86vh",
        marginTop: "80px",
      }}
    >
      <Jumbotron className="container" style={{ textAlign: "center" }}>
        <h1>Emaily!</h1>
        <p>Add Credits Create a Survey Get Feedback from users</p>
        <p>
          <Button variant="primary">
            {auth ? (
              <Link to="/surveys/new">Create New Survey</Link>
            ) : (
              <a href="/auth/google">Login to create survey</a>
            )}
          </Button>
        </p>
      </Jumbotron>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Landing);
