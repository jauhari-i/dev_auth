import React, { useEffect, useState } from "react";
import { Field, reduxForm } from "redux-form";
import { useSelector } from "react-redux";

const renderField = ({
  input,
  label,
  placeholder,
  disabled,
  type,
  meta: { touched, error },
}) => (
  <div className="form-control">
    <label htmlFor="input" className={touched && error ? "label-error" : ""}>
      {label}
    </label>
    <input
      {...input}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      className={touched && error ? "profile-input-error" : "profile-input"}
    />
    {touched && error && <p className="error-text">{error}</p>}
  </div>
);

const renderTextarea = ({
  input,
  label,
  placeholder,
  disabled,
  meta: { touched, error },
}) => (
  <div className="form-control">
    <label htmlFor="input" className={touched && error ? "label-error" : ""}>
      {label}
    </label>
    <textarea
      {...input}
      placeholder={placeholder}
      disabled={disabled}
      className={
        touched && error ? "profile-text-input-error" : "profile-text-input"
      }
    />
    {touched && error && <p className="error-text">{error}</p>}
  </div>
);

let ProfileForm = ({ handleSubmit, change }) => {
  const { dataUser, isLoadingUpdate } = useSelector((s) => s.profile);

  const [file, setFile] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const files = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);
    fileReader.onload = () => {
      setFile(fileReader.result);
    };
  };

  useEffect(() => {
    if (dataUser.userId) {
      change("name", dataUser.name);
      change("email", dataUser.email);
      change("password", dataUser.password);
      change("bio", dataUser.bio);
      change("phoneNumber", dataUser.phoneNumber);
    }
  }, [dataUser]);

  useEffect(() => {
    if (file.length) {
      change("picture", file);
    } else {
      change("picture", dataUser.picture);
    }
  }, [file, dataUser]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="profile-img">
        <img src={file.length > 0 ? file : dataUser.picture} alt="logo" />
        <input
          accept="image/x-png,image/jpeg"
          type="file"
          name="picture"
          id="picture"
          style={{ display: "none" }}
          onChange={handleChange}
        />
        <label htmlFor="picture" className="upload-button">
          CHANGE PHOTO
        </label>
      </div>
      <Field
        type="text"
        name="name"
        id="name"
        placeholder="Enter your name ..."
        label="Name"
        component={renderField}
        disabled={isLoadingUpdate}
      />
      <Field
        type="text"
        name="bio"
        id="bio"
        placeholder="Enter your bio ..."
        label="Bio"
        component={renderTextarea}
        disabled={isLoadingUpdate}
      />
      <Field
        type="text"
        name="phoneNumber"
        id="phoneNumber"
        placeholder="Enter your phone ..."
        label="Phone"
        component={renderField}
        disabled={isLoadingUpdate}
      />
      <Field
        type="email"
        name="email"
        id="email"
        placeholder="Enter your email ..."
        label="Email"
        component={renderField}
        disabled={true}
      />
      <Field
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password ..."
        label="Password"
        component={renderField}
        disabled={isLoadingUpdate}
      />
      <button type="submit" className="save-button">
        {isLoadingUpdate ? <div className="spinner" /> : "Save"}
      </button>
    </form>
  );
};

const validate = (values) => {
  const { bio, name, phoneNumber, email, password } = values;

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return {
    email: !email
      ? "Email is required"
      : !validateEmail(email) && "Email is not valid",
    bio: !bio && "Bio is required",
    name: !name && "Name is required",
    phoneNumber: !phoneNumber && "Phone Number is required",
    password: !password && "Password is required",
  };
};

ProfileForm = reduxForm({ form: "profile", validate })(ProfileForm);

export default ProfileForm;
