import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import TodoNewPage from "./pages/todo/new";
import UserNewPage from "./pages/users/new";

function HomePage() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Welcome to the App</h1>
      <p>Navigate to manage your tasks and users</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", minHeight: "100vh", width: "100%" }}>
        <nav
          style={{
            width: "200px",
            minWidth: "200px",
            background: "#ffffff",
            padding: "2rem 1rem",
            borderRight: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            boxShadow: "2px 0 10px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            style={{
              marginBottom: "1rem",
              paddingBottom: "1rem",
              // borderBottom: '1px solid #e2e8f0'
            }}
          >
            {/* <h2 style={{ 
              margin: 0, 
              fontSize: '1.5rem', 
              color: '#667eea',
              fontWeight: '700'
            }}>
              App
            </h2> */}
          </div>

          <div>
            {/* <h3 style={{ 
              fontSize: '0.75rem', 
              color: '#667eea', 
              fontWeight: '700',
              marginBottom: '1rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              MENU
            </h3> */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "#4a5568",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  transition: "all 0.2s",
                  fontSize: "0.95rem",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#f7fafc";
                  e.target.style.color = "#667eea";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#4a5568";
                }}
              >
                🏠 Home
              </Link>
              <Link
                to="/todo/new"
                style={{
                  textDecoration: "none",
                  color: "#4a5568",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  transition: "all 0.2s",
                  fontSize: "0.95rem",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#f7fafc";
                  e.target.style.color = "#667eea";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#4a5568";
                }}
              >
                ✓ Todo
              </Link>
              <Link
                to="/users/new"
                style={{
                  textDecoration: "none",
                  color: "#4a5568",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  transition: "all 0.2s",
                  fontSize: "0.95rem",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#f7fafc";
                  e.target.style.color = "#667eea";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#4a5568";
                }}
              >
                👥 Users
              </Link>
            </div>
          </div>
        </nav>

        <main
          style={{
            flex: 1,
            width: "100%",
            overflow: "auto",
            background: "#f8f9fa",
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/todo/new" element={<TodoNewPage />} />
            <Route path="/users/new" element={<UserNewPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
