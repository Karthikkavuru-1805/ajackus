import React, { useState, useEffect } from "react";
import '../styles/userForm.css';
const UserForm = ({ selectedUser, onSave, onCancel }) => {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    if (selectedUser) setUser(selectedUser);
  }, [selectedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.name || !user.email) {
      alert("Please fill out all fields!");
      return;
    }
    onSave(user);
    setUser({ name: "", email: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="form_container">
      <h2 >
        {selectedUser ? "Edit User" : "Add User"}
      </h2>
      <div className="mb-4">
        <label >Name</label>
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label>Email</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div>
        <button type="submit"
         >
          Save
        </button>
        {selectedUser && (
          <button
            type="button"
            onClick={() => {
              onCancel();
              setUser({ name: "", email: "" });
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
