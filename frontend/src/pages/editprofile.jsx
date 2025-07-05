import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import axios from "axios";
import "./EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
  });

  // Specifies [userId, token] as dependencies for the useEffect hook, meaning the effect will re-run if either userId or token changes.
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { firstName, lastName, phone, email, gender } = res.data;
        setFormData({
          firstName: firstName || "",
          lastName: lastName || "",
          phone: phone || "",
          email: email || "",
          gender: gender || "",
        });
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchUserData();
  }, [userId, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Profile updated successfully");
      navigate("/profilepage");
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  return (
    <div className="edit-profile-page">
      <Sidebar />
      <h1>My Profile</h1>
      <div className="edit-profile-container">
        <div className="edit-profile-card">
          <h2>Edit Profile</h2>
          <form onSubmit={handleSubmit} className="edit-form">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />

            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />

            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
            />

            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Gay">Gay</option>
              <option value="Lesbian">Lesbian</option>
              <option value="Bisexual">Bisexual</option>
              <option value="Transgender">Transgender</option>
              <option value="Prefer not to say">Prefer not to say</option>
              <option value="Other">Other</option>
            </select>

            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;