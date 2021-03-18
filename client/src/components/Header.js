import React from "react";
import { connect } from "react-redux";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Payments from "../components/Payments";

class Header extends React.Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return "Loading...";
      case false:
        return (
          <Nav.Link
            href="/auth/google"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <i className="fab fa-google" style={{ paddingRight: "10px" }}></i>
            Login With Google
          </Nav.Link>
        );
      default:
        return [
          <Nav.Link key="1">
            <Payments />
          </Nav.Link>,
          <Nav.Link key="2" style={{ color: "#fff" }}>
            Credits : {this.props.auth.credits}
          </Nav.Link>,
          <Nav.Link key="3" style={{ color: "#fff" }}>
            <Link to="/surveys">My Surveys</Link>
          </Nav.Link>,
          <Nav.Link key="4" href="/api/logout" style={{ color: "crimson" }}>
            Logout
          </Nav.Link>,
        ];
    }
  }

  render() {
    return (
      <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand>
          <i className="fas fa-envelope-open-text"></i>&nbsp;
          <Link to={this.props.auth ? "/surveys" : "/"}>Emaily</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav
          className="ml-auto"
          style={{ display: "flex", alignItems: "center" }}
        >
          {this.renderContent()}
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Header);
