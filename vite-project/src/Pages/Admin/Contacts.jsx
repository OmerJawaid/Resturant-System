import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError("");
      
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error("Admin authentication required");
      }
      
      const response = await axios.get("http://localhost:8081/admin/contacts", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setContacts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setError("Failed to load contact submissions. Please try again later.");
      setLoading(false);
    }
  };

  const handleViewContact = (contact) => {
    setCurrentContact(contact);
    setShowModal(true);
  };

  const filteredContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Contact Submissions</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search contacts..."
                className="px-4 py-2 border rounded-md w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              className="admin-button admin-button-primary"
              onClick={fetchContacts}
            >
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        <div className="mb-4">
          <span className="text-gray-600">Total: {contacts.length} submissions</span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading contact submissions...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">No contact submissions found</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td className="max-w-xs truncate">{contact.subject}</td>
                  <td>{formatDate(contact.createdAt)}</td>
                  <td className="admin-table-actions">
                    <button 
                      className="admin-button admin-button-secondary"
                      onClick={() => handleViewContact(contact)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Contact Detail Modal */}
      {showModal && currentContact && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">
                Contact Submission Details
              </h2>
              <button 
                className="admin-modal-close"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="admin-modal-body">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                <p><strong>Name:</strong> {currentContact.name}</p>
                <p><strong>Email:</strong> {currentContact.email}</p>
                <p><strong>Phone:</strong> {currentContact.phone || "N/A"}</p>
                <p><strong>Date:</strong> {formatDate(currentContact.createdAt)}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Message</h3>
                <p><strong>Subject:</strong> {currentContact.subject}</p>
                <div className="mt-2 p-4 bg-gray-50 rounded-md">
                  <p>{currentContact.message}</p>
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button 
                className="admin-button admin-button-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <a 
                href={`mailto:${currentContact.email}?subject=Re: ${currentContact.subject}`}
                className="admin-button admin-button-primary"
              >
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Contacts; 