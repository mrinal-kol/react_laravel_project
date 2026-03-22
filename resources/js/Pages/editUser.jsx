import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";

export default function Details({ usaerdata }) {

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(usaerdata);
  }, [usaerdata]);

 

  return (
    <div>
      <h1>Interview Page</h1>

      
        {usaerdata.map((user) => (
          <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "30%" ,background: 'snow'}}>
          <tr key={user.id}>
            <td>ID</td> <td>{user.id}</td></tr><tr>
            <td>Name</td> <td>{user.name}</td></tr><tr>
            <td>Email</td><td>{user.email}</td></tr><tr>
            <td>Message</td><td>{user.message}</td></tr><tr>
            <td>Action</td><td><a href={`/edituser/${user.id}`}>Save</a></td></tr>
           </table>
          ))}
       
      

    </div>
  );
}