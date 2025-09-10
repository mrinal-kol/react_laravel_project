import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";
import "./Contact.css"; // ✅ Import styles

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMsg("");

        Inertia.post("/contact-submit", form, {
            onSuccess: (page) => {
                 if (page.props.flash?.success) {
                        setSuccessMsg(page.props.flash.success);
                        setForm({ name: "", email: "", message: "" });
                          setTimeout(() => {
            setSuccessMsg("");
        }, 5000);
                    }
            },
            onError: (err) => {
                console.log("Validation Errors:", err);
                setErrors(err);
                if (err.form) {
                    setTimeout(() => {
                        setErrors((prev) => ({ ...prev, form: undefined }));
                    }, 5000);
                }
            },
        });
    };

    return (
        <div className="contact-page">
            <div className="contact-card">
                <h1 className="contact-title">Contact Us</h1>
                <p className="contact-subtitle">
                    Have questions? Fill out the form and we’ll get back to you shortly.
                </p>

                {successMsg && <div className="success-msg">{successMsg}</div>}
                {errors.form && <div className="error-text">{errors.form}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="form-input"
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="form-input"
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Message</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            className="form-textarea"
                        />
                        {errors.message && <span className="error-text">{errors.message}</span>}
                    </div>

                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>

                {/* Back button */}
                <Link href="/" className="back-btn">
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
