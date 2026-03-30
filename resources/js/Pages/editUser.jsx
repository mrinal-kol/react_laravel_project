import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Details({ usaerdata }) {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(usaerdata); // copy props to state
  }, [usaerdata]);

  const handleChange = (index, field, value) => {
    const updated = [...users];
    updated[index][field] = value;
    setUsers(updated);
  };

  const handleUpdate = async (e, user) => {
    e.preventDefault();
    //console.log(user); // correct updated row
        try {
        await axios.put(`/updateUserDetails/${user.id}`, user);
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div>
      <h1>Interview Page</h1>

      {users.map((user, index) => (
        <form onSubmit={(e) => handleUpdate(e, user)} key={user.id}>
         <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "70%", background: "snow" }}>
  
          <tbody>
                <tr style={{ display: "none" }}>
                <td colSpan="2">
                  <input type="hidden" value={user.id} />
                </td>
              </tr>

            <tr>
              <td>Name</td>
              <td>
                <input
                  value={user.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>Email</td>
              <td>
                <input
                  value={user.email}
                  onChange={(e) => handleChange(index, "email", e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>Message</td>
              <td>
                <textarea
                  value={user.message}
                  onChange={(e) => handleChange(index, "message", e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>Action</td>
              <td><button type="submit">Update</button></td>
            </tr>
          </tbody>

        </table>
        </form>
      ))}
    </div>
  );
}