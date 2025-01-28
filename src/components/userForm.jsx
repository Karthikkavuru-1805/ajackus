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
      <div className="heading-container">
      <h2 className="heading">
        {selectedUser ? "Edit User" : "Add User"}
      </h2>
      </div>
      <div className="mb-5 col-md-6">
        <label className="input-label" >Name</label>
        <input
          type="text" 
          value={user.name}
          placeholder="please enter a valid name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </div>
      <div className="mb-4 mt-4">
        <label className="input-label">Email</label>
        <input
          type="email"
          value={user.email}
          placeholder="please enter a valid email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div>
        <button type="submit" className="save-button"
         >
          Save
        </button>
        {selectedUser && (
          <button
            type="button" 
            className="cancel-button"
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
