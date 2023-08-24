import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
function User() {
  const { loggedInUser, isLoggedIn } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    console.log("e.target.files[0]: ", e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit called");

    const formData = new FormData();

    formData.append("file", file);

    try {
      const axiosResp = await axios.post("/api/users/image-upload", formData, {
        withCredentials: true,
      });

      console.log("successfully uploaded", axiosResp.data);

      window.location.reload();
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError(error.message);
      }
      console.log("error while uploadung", error);
    }
  };
  return (
    <div>
      <h1> Wilkommen {loggedInUser.name}</h1>
      <p>E-Mail:{loggedInUser.email}</p>
      <img width={100} src="http://localhost:4000/api/users/image-get" alt="" />
      <h2>Upload</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit">Hochladen</button>
      </form>
      <p className="info">
        {error} <br /> {msg}
      </p>
    </div>
  );
}

export default User;
