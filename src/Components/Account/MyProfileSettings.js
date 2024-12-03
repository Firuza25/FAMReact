import React, { useContext, useState, useEffect } from "react";
import { context } from "../../App";
import { Form, Input, Button } from 'antd';
import axios from "axios";
import { setLogin, setCredentials, setError, authorize } from "../../store";

import { useSelector, useDispatch } from "react-redux";

const MyProfileSettings = () => {
  const dispatch = useDispatch();
  const { activeUser, credentials, isAuthorized } = useSelector(state => state.data);
  const [usernameValue, setUsernameValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [error, setErrorState] = useState("");

  // Update state when activeUser changes
  useEffect(() => {
    if (activeUser) {
      if (usernameValue === "") setUsernameValue(activeUser.username);
      if (nameValue === "") setNameValue(activeUser.name);
    }
  }, [activeUser, usernameValue, nameValue]);

  useEffect(() => {
    if (credentials && usernameValue !== "" && credentials.find((user) => user.username === usernameValue)) {
      dispatch(authorize(true));
    } else {
      dispatch(authorize(false));
    }
  }, [usernameValue]);

  const handleChangeDetails = async (userId, usernameValue, nameValue) => {
    if (!isAuthorized && usernameValue !== "") {
      try {
        const updatedUser = {
          id: userId,
          username: usernameValue,
          password: activeUser.password,
          name: nameValue,
        };
        const response = await axios.put(`http://localhost:3031/users/${userId}`, updatedUser);
        console.log("User updated successfully:", response.data);
        alert("User details changed successfully!");
      } catch (error) {
        console.error("Error updating user:", error);
        setErrorState("Error updating user details. Please try again.");
      }
    }
  };

  const handleAccountDelete = async (userId) => {
    if (activeUser) {
      try {
        await axios.delete(`http://localhost:3031/users/${userId}`);
        console.log("Account deleted successfully");
        alert("Account deleted successfully!");
        dispatch(setLogin(false)); // Use the correct action here
        dispatch(setCredentials([])); // Reset credentials
        dispatch(setErrorState("")); // Reset error state
      } catch (err) {
        console.error("Failed to delete account:", err);
        setErrorState("Failed to delete account. Please try again.");
      }
    }
  };

  return (
    <div>
      <h1>Profile Settings</h1>
      <p>Personal Details</p>
      <div>
        <Form
          name="profile-form"
          initialValues={{ remember: true }}
          onFinish={() => {
            handleChangeDetails(activeUser.id, usernameValue, nameValue);
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: false }]}
          >
            <Input
              placeholder={activeUser.username}
              value={usernameValue}
              onChange={(e) => { setUsernameValue(e.target.value) }}
            />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: false }]}
          >
            <Input
              value={nameValue}
              placeholder={activeUser.name}
              onChange={(e) => { setNameValue(e.target.value) }}
            />
          </Form.Item>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <Form.Item>
            <Button type="primary" htmlType="submit">Change Profile data</Button>
          </Form.Item>
          <Form.Item>
            <Button type="secondary" onClick={() => handleAccountDelete(activeUser.id)}>Delete My Account</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default MyProfileSettings