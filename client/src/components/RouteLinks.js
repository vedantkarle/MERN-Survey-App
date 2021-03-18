import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const RouteLinks = (props) => {
  return props.auth ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/" />
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(RouteLinks);
