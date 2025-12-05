import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import TodoNewPage from "./pages/todo/new";

function HomePage() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Welcome to the App</h1>
      <p>Navigate to the Todo page to manage your tasks</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* <nav style={{ 
        padding: '1rem', 
        background: '#f5f5f5', 
        marginBottom: '1rem',
        display: 'flex',
        gap: '1rem',
        borderBottom: '2px solid #ddd'
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#646cff', fontWeight: 'bold' }}>
          Home
        </Link>
        <Link to="/todo/new" style={{ textDecoration: 'none', color: '#646cff', fontWeight: 'bold' }}>
          Todo
        </Link>
      </nav> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todo/new" element={<TodoNewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
