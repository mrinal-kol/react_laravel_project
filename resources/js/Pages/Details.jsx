import React from 'react';
import { usePage } from '@inertiajs/react';

export default function Details() {
  // Get data passed from Laravel controller
  const { users } = usePage().props;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>User Details</h2>

      {users.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user,slno) => (
              <tr key={user.id}>
                <td>{slno+1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><input type='button' name='edit' class='editrec' value='Edit'/></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
