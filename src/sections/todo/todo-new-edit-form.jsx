import { useState } from "react";
import PropTypes from "prop-types";

function TodoNewEditForm({ onAddTodo }) {
  const [todoText, setTodoText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todoText.trim()) {
      onAddTodo(todoText.trim());
      setTodoText("");
    }
  };

  return (
    <div className="todo-form-container">
      {/* <h2>Add New Todo</h2> */}
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Enter your todo..."
          className="todo-input"
        />
        <button type="submit" className="add-btn">
          Add Todo
        </button>
      </form>
      <style>{`
        .todo-form-container {
          width: 100%;
          margin-bottom: 2.5rem;
          padding: 0 2rem;
          box-sizing: border-box;
        }

        .todo-form-container h2 {
          margin-bottom: 1rem;
          color: #fff;
        }

        .todo-form {
          display: flex;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          padding: 1.5rem;
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .todo-input {
          flex: 1;
          padding: 1rem 1.25rem;
          font-size: 1.05rem;
          border: none;
          border-radius: 12px;
          outline: none;
          background: rgba(255, 255, 255, 0.95);
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          width:500px
        }

        .todo-input:focus {
          background: #ffffff;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
          transform: translateY(-2px);
        }

        .todo-input::placeholder {
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

TodoNewEditForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default TodoNewEditForm;
