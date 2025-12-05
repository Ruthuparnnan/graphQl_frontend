import PropTypes from 'prop-types';

function TodoListView({ todos, onToggleTodo, onDeleteTodo }) {
  return (
    <div className="todo-list-container">
      <h2>Todo List</h2>
      {todos.length === 0 ? (
        <p className="empty-message">No todos yet. Add one above!</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onToggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <span className="todo-text">{todo.title}</span>
              </div>
              <button
                onClick={() => onDeleteTodo(todo.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <style>{`
        .todo-list-container {
          margin-top: 2rem;
          width: 100%;
          padding: 0 2rem;
          box-sizing: border-box;
        }

        .todo-list-container h2 {
          margin-bottom: 1.5rem;
          color: #2d3748;
          font-size: 1.8rem;
          font-weight: 600;
          text-align: center;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);
        }

        .empty-message {
          color: #718096;
          font-style: italic;
          text-align: center;
          font-size: 1.1rem;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          border-radius: 15px;
        }

        .todo-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .todo-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .todo-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .todo-item.completed {
          background: rgba(255, 255, 255, 0.7);
        }

        .todo-item.completed .todo-text {
          text-decoration: line-through;
          color: #999;
          opacity: 0.7;
        }

        .todo-content {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .todo-checkbox {
          cursor: pointer;
          width: 22px;
          height: 22px;
          accent-color: #667eea;
          transition: transform 0.2s ease;
        }

        .todo-checkbox:hover {
          transform: scale(1.1);
        }

        .todo-text {
          font-size: 1.05rem;
          color: #333;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .delete-btn {
          padding: 0.6rem 1.25rem;
          background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(238, 90, 111, 0.3);
        }

        .delete-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(238, 90, 111, 0.5);
          background: linear-gradient(135deg, #ee5a6f, #ff6b6b);
        }

        .delete-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

TodoListView.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggleTodo: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
};

export default TodoListView;
