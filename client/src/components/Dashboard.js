import { connect } from "react-redux";
import { useEffect } from "react";
import { Button as Btn } from "react-floating-action-button";
import toast, { Toaster } from "react-hot-toast";
import SurveyList from "./surveys/SurveyList";

const Dashboard = ({ history, message, error }) => {
  useEffect(() => {
    if (message) {
      toast.success(message);
    } else if (error) {
      toast.error(error);
    }
  }, [message, error]);

  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ style: { fontSize: "14px", marginTop: "140px" } }}
      />
      <SurveyList />
      <div style={{ position: "fixed", top: "85%", left: "93%" }}>
        <Btn
          tooltip="Create a survey"
          icon="fas fa-plus"
          rotate={false}
          onClick={() => history.push("/surveys/new")}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    message: state.survey.message,
    error: state.survey.error,
  };
};

export default connect(mapStateToProps)(Dashboard);
