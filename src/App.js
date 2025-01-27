import logo from './logo.svg';
import './App.css';
import Userlist from './components/Userlist';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './components/userForm';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const[users,setUsers]=useState([]);
  const[isLoading,setIsLoading]=useState(false);
  const[isError,setisError]=useState(null);

  const[selectedUser,setSelectedUser]=useState();
  const getData=()=>{
    setIsLoading(true)
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then((res)=>setUsers(res.data))
    .catch((err)=>setisError(err.message))
    .finally(setIsLoading(false))
  }
  useEffect(() => {
    getData();
  }, [])
  
  const handleSaveUser = (user) => {
    if (user.id) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      user.id = Date.now(); 
      setUsers([...users, user]);
    }
  };

  // Delete user
  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <>
    <ErrorBoundary>
    <UserForm
    selectedUser={selectedUser}
    onSave={handleSaveUser}
    onCancel={() => setSelectedUser(null)}
    />
       <Userlist
        UserData={users}
        onEdit={(user) => setSelectedUser(user)}
          onDelete={handleDeleteUser}
         />
    </ErrorBoundary>
    </>
  );
}

export default App;
