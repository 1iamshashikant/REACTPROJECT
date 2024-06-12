import React, { useState } from 'react';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);

  const addUserHandler = (event) => {
    event.preventDefault();

    if (!username.trim() || !age.trim()) {
      setError('Please enter both username and age.');
      setShowOverlay(true);
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(username.trim())) {
      setError('Username should contain only letters and spaces.');
      setShowOverlay(true);
      return;
    }

    if (parseInt(age) <= 0) {
      setError('Age must be greater than 0.');
      setShowOverlay(true);
      return;
    }

    // Format the user's name and age
    const formattedName = `${username} (${age} years old)`;

    // Add the formatted user to the list of users
    setUsers(prevUsers => [...prevUsers, formattedName]);

    // Clear form fields and error message
    setUsername('');
    setAge('');
    setError('');
    setShowOverlay(false);
  };

  const handleOkayButtonClick = () => {
    setShowOverlay(false);
  };

  return (
    <div>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <form onSubmit={addUserHandler}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button type="submit" style={{ backgroundColor: 'blue', color: 'white', marginTop: '10px' }}>Add User</button>
        </form>
      </div>
      {showOverlay && (
        <div className="overlay-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => setShowOverlay(false)}>
          <div style={{ backgroundColor: 'blue', color: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', marginBottom: '10px' }}>Invalid</div>
            <div style={{ fontSize: '14px', marginBottom: '10px' }}>{error}</div>
            <button onClick={handleOkayButtonClick}>Okay</button>
          </div>
        </div>
      )}
      {users.length > 0 && (
        <div style={{ backgroundColor: 'yellow', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
          {users.map((user, index) => (
            <p key={index}>{user}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddUser;
