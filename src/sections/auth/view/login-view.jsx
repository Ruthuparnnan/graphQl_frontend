import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";
import LoginForm from "../login-form";
import { useAuthContext } from "../../../hooks/use-auth-context";

function LoginView() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { checkUserSession } = useAuthContext();

  const handleLogin = async (formData) => {
    setLoading(true);
    setError(null);

    const loginMutation = `
      mutation Login($input: LoginUserInput!) {
        login(input: $input) {
          accessToken
        }
      }
    `;

    try {
      const response = await axios.post("", {
        query: loginMutation,
        variables: {
          input: {
            email: formData.email,
            password: formData.password,
          },
        },
      });

      if (response.data.errors) {
        setError(response.data.errors[0].message);
        return;
      }

      const { accessToken } = response.data.data.login;
      
      // Store access token in session storage for this session
      sessionStorage.setItem("access_token", accessToken);

      // Refresh user session from auth context
      await checkUserSession();

      // Navigate to home page
      navigate("/");
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
