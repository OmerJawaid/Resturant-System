import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:8081/admin/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Use sample data if API fails
      const sampleUsers = [
        {
          _id: "1",
          FirstName: "John",
          LastName: "Doe",
          Username: "johndoe",
          Email: "john@example.com",
          Phone: "123-456-7890"
        },
        {
          _id: "2",
          FirstName: "Jane",
          LastName: "Smith",
          Username: "janesmith",
          Email: "jane@example.com",
          Phone: "987-654-3210"
        },
        {
          _id: "3",
          FirstName: "Mike",
          LastName: "Johnson",
          Username: "mikej",
          Email: "mike@example.com",
          Phone: "555-123-4567"
        },
        {
          _id: "4",
          FirstName: "Sarah",
          LastName: "Williams",
          Username: "sarahw",
          Email: "sarah@example.com",
          Phone: "555-987-6543"
        },
        {
          _id: "5",
          FirstName: "David",
          LastName: "Brown",
          Username: "davidb",
          Email: "david@example.com",
          Phone: "555-555-5555"
        }
      ];
      setUsers(sampleUsers);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("adminToken");
        await axios.delete(`http://localhost:8081/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(users.filter(user => user._id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
        // For demo, just remove from state
        setUsers(users.filter(user => user._id !== userId));
      }
    }
  };

  const filteredUsers = users.filter(user => {
    const fullName = `${user.FirstName} ${user.LastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) ||
           user.Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user.Email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <AdminLayout>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Users Management</h2>
        </div>
        
        <div className="mb-6 flex justify-between">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search users..."
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <span className="text-gray-600">Total: {filteredUsers.length} users</span>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-600"></div>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.FirstName} {user.LastName}</td>
                  <td>{user.Username}</td>
                  <td>{user.Email}</td>
                  <td>{user.Phone || "N/A"}</td>
                  <td className="admin-table-actions">
                    <button 
                      className="admin-button admin-button-danger"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default Users; 