import React from "react";
import assets from "../../assets";
import RegisterForm from "../../components/forms/RegisterForm";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GitHubLogin from "react-github-login";
import {
  fetchRegister,
  fetchFacebook,
  fetchGithub,
  fetchGoogle,
} from "./actions";
import { useDispatch } from "react-redux";

const Register = () => {
  const responseGoogle = (response) => {
    const payload = {
      name: response.profileObj.name,
      imageUrl: response.profileObj.imageUrl,
      email: response.profileObj.email,
    };
    dispatch(fetchGoogle(payload));
  };
  const responseFacebook = (response) => {
    const payload = {
      email: response.email,
      name: response.name,
      imageUrl: response.picture.data.url,
    };

    dispatch(fetchFacebook(payload));
  };
  const responseGithub = (response) => {
    const { code } = response;
    dispatch(fetchGithub(code));
  };

  const dispatch = useDispatch();

  return (
    <div>
      <div className="card-login">
        <div className="login-header">
          <img src={assets.MainLogo} alt="logo" />
          <h6>Join thousands of learners from around the world</h6>
          <p>
            Master web development by making real-life projects. There are
            multiple paths for you to choose
          </p>
        </div>
        <div className="login-body">
          <RegisterForm onSubmit={(val) => dispatch(fetchRegister(val))} />
        </div>
        <div className="login-footer">
          <p>or continue with these social profile</p>
          <div className="social-login">
            <GoogleLogin
              clientId="251728594118-f2pgmv11q1epci22cqntlctgm9ca9pf2.apps.googleusercontent.com"
              render={(renderProps) => (
                <img
                  src={assets.Google}
                  onClick={renderProps.onClick}
                  alt="google"
                />
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <FacebookLogin
              appId="901499593974564"
              callback={responseFacebook}
              fields="name,email,picture"
              render={(renderProps) => (
                <img
                  src={assets.Facebook}
                  onClick={(e) => {
                    e.preventDefault();
                    renderProps.onClick();
                  }}
                  alt="fb"
                />
              )}
            />
            <GitHubLogin
              clientId="d0507f3d716ddda60085"
              redirectUri=""
              onSuccess={responseGithub}
              onFailure={responseGithub}
              className="github"
            >
              <img src={assets.Github} alt="gh" />
            </GitHubLogin>
          </div>
          <p>
            Adready a member? <a href="/login">Login</a>
          </p>
        </div>
      </div>
      <div className="footer">
        <p>
          created by <b>Irfan Jauhari</b>
        </p>
        <a href="https://devchallenges.io/" target="_blank">
          devChallenges.io
        </a>
      </div>
    </div>
  );
};

export default Register;
