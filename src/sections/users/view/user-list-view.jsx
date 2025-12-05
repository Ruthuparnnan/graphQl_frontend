import PropTypes from 'prop-types';

function UserListView({ users, onDeleteUser }) {
  return (
    <div className="user-list-container">
      <h2>User List</h2>
      {users.length === 0 ? (
        <p className="empty-message">No users yet. Add one above!</p>
      ) : (
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="user-name">{user.name}</td>
                  <td className="user-email">{user.email}</td>
                  <td className="user-number">{user.number}</td>
                  <td>
                    <button
                      onClick={() => onDeleteUser(user.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <style>{`
        .user-list-container {
          margin-top: 2rem;
          width: 100%;
          padding: 0 2rem;
          box-sizing: border-box;
        }

        .user-list-container h2 {
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

        .table-wrapper {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .user-table {
          width: 100%;
          border-collapse: collapse;
        }

        .user-table thead {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .user-table thead tr th {
          padding: 1rem 1.5rem;
          text-align: left;
          font-size: 0.95rem;
          font-weight: 600;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          vertical-align: middle;
        }

        .user-table thead tr th:nth-child(1) {
          width: 20%;
        }

        .user-table thead tr th:nth-child(2) {
          width: 35%;
        }

        .user-table thead tr th:nth-child(3) {
          width: 25%;
        }

        .user-table thead tr th:nth-child(4) {
          width: 20%;
          text-align: center;
        }

        .user-table tbody tr {
          border-bottom: 1px solid #e2e8f0;
          transition: all 0.2s ease;
        }

        .user-table tbody tr:last-child {
          border-bottom: none;
        }

        .user-table tbody tr:hover {
          background: #f7fafc;
        }

        .user-table tbody tr td {
          padding: 1.25rem 1.5rem;
          font-size: 0.95rem;
          color: #4a5568;
          vertical-align: middle;
          text-align: left;
        }

        .user-table tbody tr td:nth-child(1) {
          width: 20%;
        }

        .user-table tbody tr td:nth-child(2) {
          width: 35%;
        }

        .user-table tbody tr td:nth-child(3) {
          width: 25%;
        }

        .user-table tbody tr td:nth-child(4) {
          width: 20%;
          text-align: center;
        }

        .user-name {
          font-weight: 600;
          color: #2d3748;
        }

        .user-email {
          color: #667eea;
        }

        .user-number {
          color: #4a5568;
        }

        .delete-btn {
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(238, 90, 111, 0.3);
        }

        .delete-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(238, 90, 111, 0.5);
          background: linear-gradient(135deg, #ee5a6f, #ff6b6b);
        }

        .delete-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

UserListView.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteUser: PropTypes.func.isRequired,
};

export default UserListView;
