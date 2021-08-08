import React from "react";
import assets from "../../assets";
import LoginForm from "../../components/forms/LoginForm";
import { useDispatch } from "react-redux";
import { fetchLogin } from "./actions";
import { fetchFacebook, fetchGithub, fetchGoogle } from "../Register/actions";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GitHubLogin from "react-github-login";

const Login = () => {
  const dispatch = useDispatch();

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
  return (
    <div>
      <div class="card-login">
        <div class="login-header">
          <img src={assets.MainLogo} alt="logo" />
          <h6>Login</h6>
        </div>
        <div class="login-body">
          <LoginForm
            onSubmit={(val) => {
              dispatch(fetchLogin(val));
            }}
          />
        </div>
        <div class="login-footer">
          <p>or continue with these social profile</p>
          <div class="social-login">
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
            Don’t have an account yet? <a href="/">Register</a>
          </p>
        </div>
      </div>
      <div class="footer">
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

export default Login;
