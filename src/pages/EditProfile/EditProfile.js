import React, { useEffect, useState } from "react";
import assets from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import ProfileForm from "../../components/forms/ProfileForm";
import { fetchProfile, editProfile } from "../Profile/actions";
import { useSnackbar } from "react-simple-snackbar";
import { useNavigate } from "react-router";
import { clearStorages } from "../../utils/storage";

const EditProfile = () => {
  const { dataUser, message } = useSelector((s) => s.profile);
  const [openSnackbar] = useSnackbar({ position: "top-right" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDropDown, setOpenDropDown] = useState(false);

  useEffect(() => {
    if (!dataUser.userId) {
      dispatch(fetchProfile());
    }
  }, [dataUser]);

  useEffect(() => {
    if (message === "successupdate") {
      dispatch(fetchProfile());
      openSnackbar("Update Profile Success!", 2000);
    }
  }, [message]);

  const handleLogout = () => {
    clearStorages();
    navigate("/login");
  };

  return (
    <div>
      <div className="navbar">
        <div className="logo">
          <img src={assets.MainLogo} alt="logo" />
        </div>
        <div
          className="user-info"
          onClick={(e) => {
            e.preventDefault();
            setOpenDropDown(!openDropDown);
          }}
        >
          <img src={dataUser.picture} alt="user-info" />
          <p>{dataUser.name}</p>
          <span className="material-icons-round">
            {openDropDown ? "arrow_drop_up" : "arrow_drop_down"}
          </span>

          <div className={openDropDown ? "popup-open" : "popup"}>
            <div className="popup-item active">
              <span class="material-icons">account_circle</span>My Account
            </div>
            <hr />
            <div
              className="popup-item logout"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              <span class="material-icons">logout</span>Log out
            </div>
          </div>
        </div>
      </div>
      <div className="form-title">
        <a href="/home">
          <span className="material-icons">keyboard_arrow_left</span> Back
        </a>
      </div>
      <div className="card-profile">
        <div className="profile-header">
          <div className="profile-title">
            <h1>Change Info</h1>
            <p>Changes will be reflected to every services</p>
          </div>
        </div>
        <div className="profile-body">
          <ProfileForm
            onSubmit={(val) => {
              if (val.password === dataUser.password) {
                const payload = {
                  name: val.name,
                  email: val.email,
                  phoneNumber: val.phoneNumber,
                  bio: val.bio,
                  picture: val.picture,
                  password: "",
                };
                dispatch(editProfile(payload));
              } else {
                const payload = {
                  name: val.name,
                  email: val.email,
                  phoneNumber: val.phoneNumber,
                  bio: val.bio,
                  picture: val.picture,
                  password: val.password,
                };
                dispatch(editProfile(payload));
              }
            }}
          />
        </div>
      </div>
      <div className="profile-footer">
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

export default EditProfile;
