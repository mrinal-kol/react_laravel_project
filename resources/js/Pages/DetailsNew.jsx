import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';

export default function Details() {
  const { users } = usePage().props;

  // popup states
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popupData, setPopupData] = useState(null);

  // form state
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
  });

  // open popup + fetch data
  const handleEditClick = async (userId) => {
    setShowPopup(true);
    setLoading(true);
    setPopupData(null);

    try {
      const res = await axios.get(`/users/${userId}`);
      setPopupData(res.data);

      setEditForm({
        name: res.data.name,
        email: res.data.email,
      });
    } catch (error) {
      alert('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  // input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  // submit update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/users/${popupData.id}`, editForm);
      alert('User updated successfully');
      setShowPopup(false);
    } catch (error) {
      alert('Update failed');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>User Details</h2>

      {users.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{ borderCollapse: 'collapse', width: '100%' }}
        >
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Remark</th>
              <th>Created On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.message}</td>
                <td>{new Date(user.created_at).toLocaleString('sv-SE')}</td>
                <td>
                  <button onClick={() => handleEditClick(user.id)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ================= POPUP ================= */}
      {showPopup && (
        <div style={overlayStyle} onClick={() => setShowPopup(false)}>
          <div style={popupStyle} onClick={(e) => e.stopPropagation()}>
            <h3>Edit User</h3>

            {loading && <p>Loading...</p>}

            {!loading && popupData && (
              <form onSubmit={handleUpdate}>
                <div style={{ marginBottom: '10px' }}>
                  <label>Name</label><br />
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label>Email</label><br />
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label>Remarks</label><br />
                  <input
                    type="text"
                    value={editForm.message}
                    disabled
                    style={inputStyle}
                  />
                </div>

                <div style={{ textAlign: 'right' }}>
                  <button type="button" onClick={() => setShowPopup(false)}>
                    Cancel
                  </button>
                  &nbsp;
                  <button type="submit">
                    Update
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const popupStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '6px',
  width: '400px',
};

const inputStyle = {
  width: '100%',
  padding: '6px',
};
