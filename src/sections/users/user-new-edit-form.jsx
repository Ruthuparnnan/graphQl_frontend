import { useState } from "react";
import PropTypes from "prop-types";

function UserNewEditForm({ onAddUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name.trim() && formData.email.trim() && formData.number.trim() && formData.password.trim()) {
      onAddUser(formData);
      setFormData({
        name: "",
        email: "",
        number: "",
        password: "",
      });
    }
  };

  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name..."
          className="user-input"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email..."
          className="user-input"
          required
        />
        <input
          type="tel"
          name="number"
          value={formData.number}
          onChange={handleChange}
          placeholder="Enter phone number..."
          className="user-input"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password..."
          className="user-input"
          required
        />
        <button type="submit" className="add-btn">
          Add User
        </button>
      </form>
      <style>{`
        .user-form-container {
          width: 100%;
          margin-bottom: 2.5rem;
          padding: 0 2rem;
          box-sizing: border-box;
        }

        .user-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          padding: 1.5rem;
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .user-input {
          padding: 1rem 1.25rem;
          font-size: 1.05rem;
          border: none;
          border-radius: 12px;
          outline: none;
          background: rgba(255, 255, 255, 0.95);
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .user-input:focus {
          background: #ffffff;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
          transform: translateY(-2px);
        }

        .user-input::placeholder {
          color: #999;
        }

        .add-btn {
          padding: 1rem 2rem;
          font-size: 1.05rem;
          font-weight: 600;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          box-shadow: 0 4px 15px rgba(118, 75, 162, 0.4);
        }

        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(118, 75, 162, 0.6);
        }

        .add-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

UserNewEditForm.propTypes = {
  onAddUser: PropTypes.func.isRequired,
};

export default UserNewEditForm;
