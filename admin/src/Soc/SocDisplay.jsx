import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash, FaLink, FaPlus } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const SocDisplay = () => {
  const api = "https://backend.aashayeinjudiciary.com/soc";
  const [socLinks, setSocLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
  });

  // Fetch data
  const fetchSocLinks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(api);
      setSocLinks(response.data.data);
      toast.success("Data loaded successfully");
    } catch (error) {
      toast.error("Failed to load data");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocLinks();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submit (create/update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update existing record
        await axios.put(`${api}/${editId}`, formData);
        toast.success("Link updated successfully");
      } else {
        // Create new record
        await axios.post(api, formData);
        toast.success("Link created successfully");
      }
      fetchSocLinks();
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.error || "Operation failed");
      console.error("Error saving data:", error);
    }
  };

  // Edit record
  const handleEdit = (link) => {
    setEditId(link._id);
    setFormData({
      name: link.name,
      url: link.url,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete record
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      try {
        await axios.delete(`${api}/${id}`);
        toast.success("Link deleted successfully");
        fetchSocLinks();
      } catch (error) {
        toast.error("Failed to delete link");
        console.error("Error deleting data:", error);
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      url: "",
    });
    setEditId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FaLink className="mr-2" /> SOC Links
      </h1>

      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit SOC Link" : "Add New SOC Link"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="SOC Name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">URL</label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
              required
            />
          </div>

          <div className="flex space-x-4 pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center"
            >
              {editId ? (
                <>
                  <FaEdit className="mr-2" /> Update Link
                </>
              ) : (
                <>
                  <FaPlus className="mr-2" /> Add Link
                </>
              )}
            </button>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Links Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Manage Links</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : socLinks.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No SOC links found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {socLinks.map((link) => (
                  <tr key={link._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {link.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        {link.url} <FiExternalLink className="ml-1" />
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(link)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(link._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocDisplay;
