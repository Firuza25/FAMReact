import React, { useContext, useState, useEffect } from "react";
import { context } from "../../App";
import { Form, Input, Button } from 'antd';
import axios from "axios";


const MyProfileSettings = () => {

    const {activeUser, setActiveUser, error, credentials, isAuthorized, 
        setAuthorized, setIsLoggedIn, setUsername, setPassword} = useContext(context)
    const [usernameValue, setUsernameValue] = useState("");
    const [nameValue, setNameValue] = useState("");

    // Update state when activeUser changes
    useEffect(() => {
        if (activeUser) {
            
            console.log("usernameValue: ", usernameValue)
            console.log("nameValue: ", nameValue)
        }
        console.log("activeUser: ", activeUser)
    }, [activeUser])

    useEffect(()=> {
        console.log("activeUser: ", activeUser)
        console.log("usernameValue1: ", usernameValue)
        console.log("nameValue1: ", nameValue)
        if(usernameValue === ""){
            setUsernameValue(activeUser.username)
        }
        if(nameValue === ""){
            setNameValue(activeUser.name)
        }
        console.log("usernameValue2: ", usernameValue)
        console.log("nameValue2: ", nameValue)

    }, [activeUser, usernameValue, nameValue])

    useEffect(() => {
        if(credentials && usernameValue !== "" && credentials.find((user) => user.username === usernameValue)){
            setAuthorized(true)
        }else setAuthorized(false)


        console.log("isAuthorized: ", isAuthorized)//default false

    }, [usernameValue])

    const handleChangeDetails = async (userId, usernameValue, nameValue) => {
        console.log("UserId: ", userId)
        if(!isAuthorized && usernameValue !== ""){
            try{
                const updatedUser = {
                    id: userId,
                    username: usernameValue,
                    password: activeUser.password,
                    name: nameValue

                }
                const response = axios.put(`http://localhost:3031/users/${userId}`, updatedUser)
                
                console.log("User updated successfully:", response.data);
                alert("User details changed successfully!")
                
            } catch (error) {
              console.error("Error updating user:", error);
            }

        }
        console.log("isAuthorized in MyProfileSettings: ", isAuthorized)
        console.log("username in MyProfileSettings: ", usernameValue)
    }

    const handleAccountDelete = async (userId) => {
        if (activeUser) {
            try {
                await axios.delete(`http://localhost:3031/users/${userId}`);
                console.log("Account deleted successfully");
                alert("Account deleted successfully!");
                setIsLoggedIn(false);
                setUsername("");
                setPassword("");
                setActiveUser({});
            } catch (err) {
                console.error("Failed to delete account:", err);
            }
        }
    };


    return (
        <div>
            <h1>Profile Settings</h1>
            <p>Personal Details</p>
            <div>
            <Form
      name="login-form"
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
        <Input value={usernameValue} placeholder={activeUser.username} onChange={(e) => {setUsernameValue(e.target.value)}} />
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: false }]}
      >
        <Input value={nameValue} placeholder={activeUser.name} onChange={(e) => {setNameValue(e.target.value)}} />
      </Form.Item>

      

      {error && <p style={{ color: 'red' }}>{error}</p>} 

      <Form.Item>
        <Button type="primary" htmlType="submit">Login</Button>
      </Form.Item>
      <Form.Item>
        <Button type="secondary" onClick={() => handleAccountDelete(activeUser.id)} >Delete My Account</Button>
      </Form.Item>
    </Form>
                
            </div>
            
        </div>
    )

}
export default MyProfileSettings