import { useState } from "react";
import axios from "../../../utils/axios";
import LoginForm from "../login-form";

function LoginView() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData) => {
    setLoading(true);
    setError(null);

    const loginMutation = `
      mutation Login($email: String!, $password: String!) {
        login(loginUserInput: { email: $email, password: $password }) {
          access_token
          user {
            id
            name
            email
          }
        }
      }
    `;

    try {
      const response = await axios.post("", {
        query: loginMutation,
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (response.data.errors) {
        setError(response.data.errors[0].message);
        return;
      }

      const { access_token, user } = response.data.data.login;
      
      // Store token in localStorage
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to home page or dashboard
      window.location.href = "/";
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-view-container">
      <LoginForm onLogin={handleLogin} />
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      {loading && (
        <div className="loading-message">
          Logging in...
        </div>
      )}
      <style>{`
        .login-view-container {
          position: relative;
          min-height: 100vh;
          width: 100%;
        }

        .error-message {
          position: fixed;
          top: 2rem;
          right: 2rem;
          background: rgba(244, 67, 54, 0.95);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(244, 67, 54, 0.4);
          font-weight: 500;
          animation: slideIn 0.3s ease;
        }

        .loading-message {
          position: fixed;
          top: 2rem;
          right: 2rem;
          background: rgba(102, 126, 234, 0.95);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          font-weight: 500;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default LoginView;
