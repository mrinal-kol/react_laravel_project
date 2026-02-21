import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Details() {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/users")
      .then(response => {
        setData(response.data.original); // IMPORTANT
      });
  }, []);

  return (
    <div>
      <h1>Interview Page</h1>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            {/* <th>Date</th> */}
          </tr>
        </thead>

        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.message}</td>
              {/* <td>{user.created_at}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}