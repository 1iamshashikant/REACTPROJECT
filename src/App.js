import React, { useState } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [address, setAddress] = useState('');
  const [editingId, setEditingId] = useState(null);

  const addStudent = () => {
    if (editingId !== null) {
      // If editingId is set, it means we're editing an existing student
      const updatedStudents = students.map((student) =>
        student.id === editingId ? { ...student, name, mobileNo, address } : student
      );
      setStudents(updatedStudents);
      setEditingId(null);
    } else {
      const newStudent = { id: totalStudents + 1, name, mobileNo, address };
      setStudents([...students, newStudent]);
      setTotalStudents(totalStudents + 1);
    }
    setName('');
    setMobileNo('');
    setAddress('');
  };

  const editStudent = (id) => {
    const studentToEdit = students.find((student) => student.id === id);
    setName(studentToEdit.name);
    setMobileNo(studentToEdit.mobileNo);
    setAddress(studentToEdit.address);
    setEditingId(id);
  };

  const deleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    setTotalStudents(totalStudents - 1);
  };

  return (
    <div className="student-manager">
      <h1>Student Manager</h1>
      <p>All students: {totalStudents}</p>
      <form onSubmit={(e) => { e.preventDefault(); addStudent(); }}>
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="mobileNo">Mobile No.:</label>
          <input
            type="text"
            id="mobileNo"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="submit">{editingId !== null ? 'Edit' : 'Add'}</button>
      </form>

      <div className="student-details">
        <h2>Student Details</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile No.</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.mobileNo}</td>
                <td>{student.address}</td>
                <td>
                  <button onClick={() => editStudent(student.id)}>Edit</button>
                  <button onClick={() => deleteStudent(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
