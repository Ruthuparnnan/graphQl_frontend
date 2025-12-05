import { useState, useEffect } from "react";
import TodoNewEditForm from "../todo-new-edit-form";
import TodoListView from "./todo-list-view";
import axiosInstance from "../../../utils/axios";

function TodoCreateView() {
  const [todos, setTodos] = useState([]);

  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axiosInstance.post("", {
          query: `
            query {
              todos {
                id
                title
                completed
              }
            }
          `,
        });

        setTodos(response.data.data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (text) => {
    try {
      const response = await axiosInstance.post("", {
        query: `
          mutation CreateTodo($input: CreateTodoInput!) {
            createTodo(input: $input) {
              id
              title
              completed
            }
          }
        `,
        variables: {
          input: {
            title: text,
          },
        },
      });

      setTodos([...todos, response.data.data.createTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleToggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const updatedCompleted = !todo.completed;

    // Optimistically update UI
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: updatedCompleted } : t
      )
    );

    try {
      await axiosInstance.post("", {
        query: `
          mutation UpdateTodo($id: String!, $input: UpdateTodoInput!) {
            updateTodo(id: $id, input: $input) {
              id
              title
              completed
            }
          }
        `,
        variables: {
          id: id,
          input: {
            completed: updatedCompleted,
          },
        },
      });
    } catch (error) {
      console.error("Error updating todo:", error);
      // Revert on error
      setTodos(
        todos.map((t) =>
          t.id === id ? { ...t, completed: todo.completed } : t
        )
      );
    }
  };

  const handleDeleteTodo = async (id) => {
    // Optimistically update UI
    setTodos(todos.filter((todo) => todo.id !== id));

    try {
      await axiosInstance.post("", {
        query: `
          mutation DeleteTodo($id: ID!) {
            deleteTodo(id: $id)
          }
        `,
        variables: {
          id: id,
        },
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
      // Could add logic to refetch todos on error
    }
  };

  return (
    <div className="todo-create-view">
      <h1>My Todo App</h1>
      <TodoNewEditForm onAddTodo={handleAddTodo} />
      <TodoListView
        todos={todos}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />
      <style>{`
        .todo-create-view {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          padding: 3rem 0;
          min-height: 100vh;
          width: 100%;
          border-radius: 15px;
          background: linear-gradient(135deg, #f5f7fa 0%, #e8eaf6 100%);
        }

        .todo-create-view h1 {
          margin-bottom: 3rem;
          color: #2d3748;
          font-size: 3rem;
          text-align: center;
          font-weight: 700;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);
          letter-spacing: 1px;
        }
      `}</style>
    </div>
  );
}

export default TodoCreateView;
