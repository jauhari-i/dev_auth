import React from "react";
import { Field, reduxForm } from "redux-form";
import { useSelector } from "react-redux";

const renderField = ({
  input,
  icon,
  label,
  type,
  meta: { touched, error },
}) => (
  <div className="form-controller">
    <span
      className={
        touched && error ? "material-icons error-icon" : "material-icons"
      }
    >
      {icon}
    </span>
    <input
      {...input}
      placeholder={label}
      type={type}
      className={touched && error ? "form-input-error" : "form-input"}
    />
    {touched && error && <p className="error-text">{error}</p>}
  </div>
);

var LoginForm = ({ handleSubmit }) => {
  const { isLoading } = useSelector((s) => s.login);
  return (
    <form onSubmit={handleSubmit}>
      <Field
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        label="Email"
        component={renderField}
        icon="email"
      />
      <Field
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        label="Password"
        component={renderField}
        icon="lock"
      />
      <button disabled={isLoading} className="form-submit" type="submit">
        {isLoading ? <div className="spinner"></div> : "Login"}
      </button>
    </form>
  );
};

const validate = (values) => {
  const { email, password } = values;

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return {
    email: !email
      ? "Email is required"
      : !validateEmail(email) && "Email is not valid",
    password: !password && "Password is required",
  };
};

LoginForm = reduxForm({ form: "login", validate })(LoginForm);

export default LoginForm;
