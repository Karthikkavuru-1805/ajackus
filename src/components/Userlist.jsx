import React, { useState } from 'react'
import '../styles/UserList.css'
const Userlist = ({UserData ,onEdit,onDelete}) => {
    const[page,setPage]=useState(0);
    const[limit,setLimit]=useState(5);
    const startIndex = page * limit;
    const endIndex = startIndex + limit;
  
    const handleNext = () => {
        if (endIndex < UserData.length) {
          setPage(page + 1);
        }
      };
    
      const handlePrevious = () => {
        if (page > 0) {
          setPage(page - 1);
        }
      };
    
      // Handle changing the limit
      const handleLimitChange = (e) => {
        setLimit(Number(e.target.value));
        setPage(0); // Reset to the first page whenever limit changes
      };
      const paginatedData = UserData.slice(startIndex, endIndex);

// console.log(UserData,"user");

  return (
     <div>
      <h2 className='heading' >User List</h2>
      <div className='table-wrapper'>
      <table className='table-container'>
        <thead>
          <tr>
            <th >ID</th>
            <th >Name</th>
            <th >Email</th>
            <th >Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((user) => (
            <tr key={user.id}>
              <td >{user.id}</td>
              <td >{user.name}</td>
              <td >{user.email}</td>
              <td >
                <button
                  onClick={() => onEdit(user)}
                >
                  Edit
                </button>
                <button className="delete_button"
                  onClick={() => onDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          )).slice(page,limit)
          
          }
        </tbody>
      </table>
      <div className="pagination-controls">
          <select
            value={limit}
            onChange={handleLimitChange}
            className="limit-selector"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
          <button
            onClick={handlePrevious}
            disabled={page === 0}
            className="pagination-button"
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {page + 1} of {Math.ceil(UserData.length / limit)}
          </span>
          <button
            onClick={handleNext}
            disabled={endIndex >= UserData.length}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Userlist