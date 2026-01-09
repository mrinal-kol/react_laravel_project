import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import axios from 'axios';

export default function Details() {
  const { users } = usePage().props;

  // page message
  const [pageMessage, setPageMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // popup states
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popupData, setPopupData] = useState(null);

  // form state
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [addForm, setAddForm] = useState({
    name: '',
    email: '',
    message: '',
  });


  // auto hide message
  useEffect(() => {
    if (pageMessage) {
      const timer = setTimeout(() => setPageMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [pageMessage]);



  const handleAddSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post('/services-submit', addForm);

    if (res.data.status) {
      setPageMessage(res.data.message);
      setMessageType('success');

      setShowAddPopup(false);
      router.reload({ only: ['users'] });
    }
  } catch (error) {
    if (error.response?.status === 422) {
      setPageMessage('Validation failed. Please check inputs.');
    } else {
      setPageMessage('Something went wrong. Please try again.');
    }
    setMessageType('error');
  }
};


  // open popup + fetch user
  const handleEditClick = async (userId) => {
    setShowPopup(true);
    setLoading(true);
    setPopupData(null);

    try {
      const res = await axios.get(`/users/${userId}`);
      setPopupData(res.data);

      setEditForm({
        name: res.data.name || '',
        email: res.data.email || '',
        message: res.data.message || '',
      });
    } catch (error) {
      setPageMessage('Failed to load user data');
      setMessageType('error');
      setShowPopup(false);
    } finally {
      setLoading(false);
    }
  };


  const handleAddChange = (e) => {
  const { name, value } = e.target;
  setAddForm(prev => ({ ...prev, [name]: value }));
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

      setPageMessage('User updated successfully');
      setMessageType('success');

      setShowPopup(false);
       router.reload({ only: ['users'] });
    } catch (error) {
      setPageMessage('Update failed. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>

      {/* ===== PAGE MESSAGE ===== */}
      {pageMessage && (
        <div
            style={{
            position: 'fixed',
            top: '70px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10000,

            padding: '12px 16px',
            minWidth: '300px',
            textAlign: 'center',
            color: messageType === 'success' ? 'black' : '#721c24',
            backgroundColor: messageType === 'success' ? '#2BF349' : '#f8d7da',
            border: '1px solid',
            borderColor: messageType === 'success' ? 'black' : '#f5c6cb',
            borderRadius: '6px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            }}
        >
            {pageMessage}
        </div>
    )}


      <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px',
          }}
        >
          <h2 style={{ margin: 0 }}>User Details</h2>

          <button
            style={{
              padding: '8px 14px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
            onClick={() => {
              setAddForm({ name: '', email: '', message: '' });
              setShowAddPopup(true);
            }}
          >
            + Add New
          </button>
        </div>
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
          <tbody style={{backgroundColor: 'snow'}} >
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.message}</td>
                <td>{new Date(user.created_at).toLocaleString('sv-SE')}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleEditClick(user.id)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}


      {showAddPopup && (
  <div
    style={overlayStyle}
    onMouseDown={(e) => {
      if (e.target === e.currentTarget) {
        setShowAddPopup(false);
      }
    }}
  >
    <div
      style={popupStyle}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <h3>Add New User</h3>

      <form onSubmit={handleAddSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name</label><br />
          <input
            type="text"
            name="name"
            value={addForm.name}
            onChange={handleAddChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Email</label><br />
          <input
            type="email"
            name="email"
            value={addForm.email}
            onChange={handleAddChange}
            style={inputStyle}
            required
          />
        </div>
         <div style={{ marginBottom: "10px" }}>
          <label>Service Required:</label><br />
          <select
            name="service"
            value={addForm.service}
            onChange={handleAddChange}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="">Select a service</option>
            <option value="web-design">Web Design</option>
            <option value="seo">SEO</option>
            <option value="marketing">Marketing</option>
          </select>
          
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Remarks</label><br />
          <input
            type="text"
            name="message"
            value={addForm.message}
            onChange={handleAddChange}
            style={inputStyle}
          />
        </div>

        <div style={{ textAlign: 'right' }}>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => setShowAddPopup(false)}
          >
            Cancel
          </button>
          &nbsp;
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}



      {/* ===== POPUP ===== */}
      {showPopup && (
        <div
          style={overlayStyle}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowPopup(false);
            }
          }}
        >
          <div
            style={popupStyle}
            onMouseDown={(e) => e.stopPropagation()}
          >
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
                    name="message"
                    value={editForm.message}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                <div style={{ textAlign: 'right' }}>
                  <button className="btn btn-primary" type="button" onClick={() => setShowPopup(false)}>
                    Cancel
                  </button>
                  &nbsp;
                  <button className="btn btn-primary" type="submit">
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

/* ===== STYLES ===== */

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
