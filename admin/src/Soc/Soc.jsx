import React, { useState } from "react";
import axios from "axios";

const Soc = () => {
  const api = "https://backend.aashayeinjudiciary.com/soc";
  const [formData, setFormData] = useState({
    name: "",
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(api, formData);
      setSuccess(true);
      // Reset form after successful submission
      setFormData({
        name: "",
        url: "",
      });
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add SOC Link</h2>

      {success && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          SOC link created successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="url">
            URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white ${
            loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Creating..." : "Create SOC Link"}
        </button>
      </form>
    </div>
  );
};

export default Soc;
