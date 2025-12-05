import { useState, useEffect } from "react";
import UserNewEditForm from "../user-new-edit-form";
import UserListView from "./user-list-view";
import axiosInstance from "../../../utils/axios";

function UserCreateView() {
  const [users, setUsers] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.post("", {
          query: `
            query {
              users {
                id
                name
                email
                number
              }
            }
          `,
        });

        setUsers(response.data.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async (userData) => {
    try {
      const response = await axiosInstance.post("", {
        query: `
          mutation CreateUser($createUserInput: CreateUserInput!) {
            createUser(createUserInput: $createUserInput) {
              id
              name
              email
              number
            }
          }
        `,
        variables: {
          createUserInput: {
            name: userData.name,
            email: userData.email,
            number: userData.number,
          },
        },
      });

      setUsers([...users, response.data.data.createUser]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    // Optimistically update UI
    setUsers(users.filter((user) => user.id !== id));

    try {
      await axiosInstance.post("", {
        query: `
          mutation RemoveUser($id: ID!) {
            removeUser(id: $id)
          }
        `,
        variables: {
          id: id,
        },
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      // Could add logic to refetch users on error
    }
  };

  return (
    <div className="user-create-view">
      <h1>User Management</h1>
      <UserNewEditForm onAddUser={handleAddUser} />
      <UserListView users={users} onDeleteUser={handleDeleteUser} />
      <style>{`
        .user-create-view {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          padding: 3rem 0;
          min-height: 100vh;
          width: 50vw;
          border-radius: 15px;
          background: linear-gradient(135deg, #f5f7fa 0%, #e8eaf6 100%);
        }

        .user-create-view h1 {
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

export default UserCreateView;
