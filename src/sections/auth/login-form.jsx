import { useState } from "react";
import PropTypes from "prop-types";

function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
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

    if (formData.email.trim() && formData.password.trim()) {
      onLogin(formData);
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Welcome Back</h2>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email..."
          className="login-input"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password..."
          className="login-input"
          required
        />
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
      <style>{`
        .login-form-container {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          box-sizing: border-box;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .login-form {
          width: 100%;
          max-width: 450px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 3rem;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .login-title {
          font-size: 2rem;
          font-weight: 700;
          color: #333;
          text-align: center;
          margin: 0 0 1rem 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .login-input {
          padding: 1rem 1.25rem;
          font-size: 1.05rem;
          border: 2px solid #e8eaf6;
          border-radius: 12px;
          outline: none;
          background: #ffffff;
          transition: all 0.3s ease;
        }

        .login-input:focus {
          border-color: #667eea;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
          transform: translateY(-2px);
        }

        .login-input::placeholder {
          color: #999;
        }

        .login-btn {
          padding: 1.25rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(118, 75, 162, 0.4);
          margin-top: 0.5rem;
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(118, 75, 162, 0.6);
        }

        .login-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
