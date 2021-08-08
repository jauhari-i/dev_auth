import React, { useEffect, useState } from "react";
import assets from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "./actions";
import { useNavigate } from "react-router";
import { clearStorages } from "../../utils/storage";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDropDown, setOpenDropDown] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  const { dataUser, isLoadingUser } = useSelector((s) => s.profile);

  const handleLogout = () => {
    clearStorages();
    navigate("/login");
  };

  if (!dataUser.userId || isLoadingUser) {
    return <div />;
  } else {
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
        <div className="title">
          <h1>Personal Info</h1>
          <p>Basic info, like your name and photo</p>
        </div>
        <div className="card-profile">
          <div className="profile-header">
            <div className="profile-title">
              <h1>Profile</h1>
              <p>Some info may be visible to other people</p>
            </div>
            <div className="action">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/update");
                }}
              >
                Edit
              </button>
            </div>
          </div>
          <div className="profile-body">
            <div className="body-row">
              <div className="body-title">PHOTO</div>
              <div className="body-content">
                <img src={dataUser.picture} alt="PHOTO" />
              </div>
            </div>
            <div className="body-row">
              <div className="body-title">NAME</div>
              <div className="body-content">
                <h1>{dataUser.name}</h1>
              </div>
            </div>
            <div className="body-row">
              <div className="body-title">BIO</div>
              <div className="body-content">
                <h1 className="bio">
                  {dataUser.bio.length > 0 ? dataUser.bio : "Not Set"}
                </h1>
              </div>
            </div>
            <div className="body-row">
              <div className="body-title">PHONE</div>
              <div className="body-content">
                <h1>
                  {dataUser.phoneNumber.length > 0
                    ? dataUser.phoneNumber
                    : "Not set"}
                </h1>
              </div>
            </div>
            <div className="body-row">
              <div className="body-title">EMAIL</div>
              <div className="body-content">
                <h1>{dataUser.email}</h1>
              </div>
            </div>
            <div className="body-row">
              <div className="body-title">PASSWORD</div>
              <div className="body-content">
                <h1>
                  {dataUser.password.length > 0 ? dataUser.password : "Not Set"}
                </h1>
              </div>
            </div>
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
  }
};

export default Profile;
