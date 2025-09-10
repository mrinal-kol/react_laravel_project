import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';

export default function Services() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg('');

    Inertia.post('/services-submit', form, {
      onSuccess: (page) => {
        if (page.props.flash?.success) {
          setSuccessMsg(page.props.flash.success);
          setForm({ name: '', email: '', service: '', message: '' });
        }
      },
      onError: (err) => setErrors(err)
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial" }}>
      <h1>Request a Service</h1>
      <Link href="/" style={{ display: "inline-block", marginBottom: "20px" }}>← Back to Home</Link>

      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Service Required:</label><br />
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="">Select a service</option>
            <option value="web-design">Web Design</option>
            <option value="seo">SEO</option>
            <option value="marketing">Marketing</option>
          </select>
          {errors.service && <span style={{ color: 'red' }}>{errors.service}</span>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Message:</label><br />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', minHeight: '100px' }}
          />
          {errors.message && <span style={{ color: 'red' }}>{errors.message}</span>}
        </div>

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
}
