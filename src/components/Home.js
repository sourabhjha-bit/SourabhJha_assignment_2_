import axios from "axios";
import "../App.css";
import React, { useEffect, useState } from "react";
import { Card, Flex } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  HeartFilled,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import Loader from "./Loader";
import EditUser from "./EditUser";

export default function Home() {
  const [liked, setLiked] = useState({});
  const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [Edituser, setEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleLike = (id) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const fetchUSers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUSers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUser = (user) => {
    setEditUser(!Edituser);
    setSelectedUser(user);
  };

  const handleUpdate = (updatedUser) => {
    setUsers(
      users.map((user) =>
        user.id === selectedUser.id ? { ...user, ...updatedUser } : user
      )
    );
  };
  // if(loading) return <Loader />

  return (
    <div className="users-div">
      {users.map((user) => (
        <Card
          className="user-card"
          key={user.id}
          style={{
            width: 300,
          }}
          cover={
            <img
              style={{ height: "200px" }}
              alt="example"
              src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user.name}`}
            />
          }
        >
            <div>
              <p className="userName">{user.name}</p>
              <p className="userEmail">
                <MailOutlined /> {user.email}
              </p>
              <p className="userPhone">
                <PhoneOutlined /> {user.phone}
              </p>
              <p>
                <GlobalOutlined /> {user.website}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  padding: "0.9rem",
                  marginLeft: "1.4rem",
                  fontSize: "1.2rem",
                  paddingRight: "0.5rem",
                }}
                onClick={() => {
                  toggleLike(user.id);
                }}
              >
                {liked[user.id] ? (
                  <HeartFilled style={{ color: "red" }} />
                ) : (
                  <HeartOutlined />
                )}
              </div>
              <div
                style={{
                  padding: "0.9rem",
                  marginLeft: "1.8rem",
                  fontSize: "1.2rem",
                }}
              >
                <EditOutlined onClick={() => handleEditUser(user)} />
                {Edituser && selectedUser && selectedUser.id === user.id &&
                  (console.log("hi from edit user"),
                  (
                    <EditUser
                      user={selectedUser}
                      openModel={true}
                      onupadate={handleUpdate}
                    />
                  ))}
              </div>
              <div
                style={{
                  padding: "0.9rem",
                  marginLeft: "1.8rem",
                  fontSize: "1.2rem",
                }}
              >
                <DeleteOutlined
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                />
              </div>
            </div>
        </Card>
      ))}
    </div>
  );
}
