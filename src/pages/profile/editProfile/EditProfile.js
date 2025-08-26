import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./EditProfile.css";
import useLoggedinUser from "../../../hooks/useLoggedinUser";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 8,
};

const Editchild = ({ dob, setdob })=> {
  const [open, setopen] = useState(false);
  const handleopen = () => {
    setopen(true);
  };
  const handleclose = () => {
    setopen(false);
  };
  return (
    <React.Fragment>
      <div className="birthdate-section" onClick={handleopen}>
        <text>Edit</text>
      </div>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleclose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-descriptiom"
      >
        <Box sx={{ ...style, width: 300, height: 300 }}>
          <div className="text">
            <h2>Edit date of birth</h2>
            <p>
              This can only be changed a few times
              <br />
              Make sure you enter the age of the <br />
              person using the account.{" "}
            </p>
            <input type="date" onChange={(e) => setdob(e.target.value)} />
            <button
              className="e-button"
              onClick={() => {
                setopen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const Editprofile = ({ user, handleUpdateUserProfile }) => {
  const [loggedinUser, setLoggedinUser] = useLoggedinUser();
  const [name, setname] = useState(loggedinUser?.name ? loggedinUser.name : "");
  const [bio, setbio] = useState(loggedinUser?.bio ? loggedinUser.bio : "");
  const [location, setlocation] = useState(loggedinUser?.location ? loggedinUser.location : "");
  const [website, setwebsite] = useState(loggedinUser?.website ? loggedinUser.website : "");
  const [open, setopen] = useState(false);
  const [dob, setdob] = useState("");
  const email = user?.email || loggedinUser?.email;

  const handlesave = () => {
    const editinfo = {
      email:email,
      name,
      bio,
      location,
      website,
      dob,
    };
    const updatedUser = handleUpdateUserProfile(editinfo);
    if (updatedUser) {
      setLoggedinUser(updatedUser);
      setopen(false);
      console.log("Profile updated successfully:", updatedUser);
    }
    // fetch(`http://localhost:5000/user/${editinfo.email}`, {
    //   method: "PATCH",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(editinfo),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("done", data);
    //   });
  };
  return (
    <div>
      <button
        onClick={() => {
          setopen(true);
        }}
        className="Edit-profile-btn"
      >
        Edit Profile
      </button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style} className="modal">
          <div className="header">
            <IconButton onClick={() => setopen(false)}>
              <CloseIcon />
            </IconButton>
            <h2 className="header-title">Edit Profile</h2>
            <button className="save-btn" onClick={handlesave}>
              Save
            </button>
          </div>
          <form className="fill-content">
            <TextField
              className="text-field"
              fullWidth
              label="Name"
              id="fullWidth"
              variant="filled"
              onChange={(e) => setname(e.target.value)}
              value={name}
              // defaultValue={loggedinUser?.name ? loggedinUser?.name : ""}
            />
            <TextField
              className="text-field"
              fullWidth
              label="Bio"
              id="fullWidth"
              variant="filled"
              onChange={(e) => setbio(e.target.value)}
              // deafultValue={loggedinUser?.bio ? loggedinUser.bio : ""}
              value={bio}
            />
            <TextField
              className="text-field"
              fullWidth
              label="Location"
              id="fullWidth"
              variant="filled"
              onChange={(e) => setlocation(e.target.value)}
              // deafultValue={
              //   loggedinUser?.location ? loggedinUser.location : ""
              // }
              value={location}
            />
            <TextField
              className="text-field"
              fullWidth
              label="Website"
              id="fullWidth"
              variant="filled"
              onChange={(e) => setwebsite(e.target.value)}
              // deafultValue={
              //   loggedinUser?.website ? loggedinUser.website : ""
              // }
              value={website}
            />
          </form>
          <div className="birthdate-section">
            <p>Birth Date</p>
            <p>.</p>
            <Editchild dob={dob} setdob={setdob} />
          </div>
          <div className="last-section">
            {loggedinUser?.dob ? (
              <h2>{loggedinUser?.dob}</h2>
            ) : (
              <h2>{dob ? dob : "Add your date of birth"}</h2>
            )}
            <div className="last-btn">
              <h2>Switch to Professional</h2>
              <ChevronRightIcon />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Editprofile;
