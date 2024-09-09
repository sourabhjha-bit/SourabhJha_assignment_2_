import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import '../App.css';

function EditUser({ user, openModel }) {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    setOpen(openModel);
    setUserData(user);
    if (userData !== user) {
      setUserData(user);
    }
  }, [user]);

  const handleSubmit =(e)=> {
    e.preventDefault()

    axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, userData).then(()=>{

    })
  }
  const handleclose = () => {
    setOpen(false);
  };

  const handleOk =()=>{
    setOpen(false)
  }

  return (
    <>
      <Modal
        title="Basic Modal"
        className="Modal-user"
        onCancel={handleclose}
        onOk={handleOk}
        open={open}
        key={user.id}
        okButtonProps={{
          disabled: false,
        }}
        cancelButtonProps={{
          disabled: false,
        }}
      >
        <form onSubmit={handleSubmit}>
          <label className="label-Card">
            <span style={{ color: "red" }}>*</span>Name:
          </label>
          <input
            type="text"
            placeholder="Name"
            value={user?.name || ""}
            onChange={(e) => setUserData({ ...user, name: e.target.value })}
            className="input"
            required
          />
          <label className="label-Card">
            <span style={{ color: "red" }}>*</span>Email:
          </label>
          <input
            type="text"
            placeholder="email"
            value={user?.email || ""}
            onChange={(e) => setUserData({ ...user, Email: e.target.value })}
            className="input"
            required
          />
          <label className="label-Card">
            <span style={{ color: "red" }}>*</span>Phone:
          </label>
          <input
            type="text"
            placeholder="phone"
            value={user?.phone || ""}
            onChange={(e) => setUserData({ ...user, phone: e.target.value })}
            className="input"
            required
          />
          <label className="label-Card">
            <span style={{ color: "red" }}>*</span>Website:
          </label>
          <input
            type="text"
            placeholder="website"
            value={user?.website || ""}
            onChange={(e) => setUserData({ ...user, name: e.target.value })}
            className="input"
            required
          />
        </form>
      </Modal>
    </>
  );
}

export default EditUser;
