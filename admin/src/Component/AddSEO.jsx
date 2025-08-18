// src/pages/seo/AddSEO.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSEO = () => {
  const [seoData, setSeoData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false); // loading state
  const [pathError, setPathError] = useState("");
  const [formData, setFormData] = useState({
    path: "",
    element: "",
    title: "",
    description: "",
    keywords: "",
  });

  const fetchSeoData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://backend.aashayeinjudiciary.com/api/seo"
      );

      console.log(res, "seo data");
      setSeoData(res.data);
    } catch (error) {
      toast.error("Failed to fetch SEO data");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoute = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://backend.aashayeinjudiciary.com/dynamics/"
      );

      console.log(res, "seo data");
      setRoutes(res.data);
    } catch (error) {
      toast.error("Failed to fetch SEO data");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeoData();
    fetchRoute();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "path") {
      if (!/^\//.test(value)) {
        setPathError("Path must start with /");
      } else if (value.includes(":")) {
        setPathError("Path cannot contain dynamic params like :slug or :id");
      } else if (!/^\/[a-zA-Z0-9\-\/]*$/.test(value)) {
        setPathError("Path contains invalid characters");
      } else {
        setPathError("");
      }
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pathError) {
      toast.error("Please fix the errors before submitting");
      return;
    }
    setLoading(true);
    try {
      if (isEditMode) {
        await axios.put(
          `https://backend.aashayeinjudiciary.com/api/seo/${editId}`,
          formData
        );
        toast.success("SEO data updated!");
      } else {
        await axios.post(
          "https://backend.aashayeinjudiciary.com/api/seo",
          formData
        );
        toast.success("SEO data added!");
      }

      setFormData({
        path: "",
        element: "",
        title: "",
        description: "",
        keywords: "",
      });
      setIsEditMode(false);
      setEditId(null);
      setShowForm(false);
      fetchSeoData();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to save SEO data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    setLoading(true);
    try {
      await axios.delete(
        `https://backend.aashayeinjudiciary.com/api/seo/${id}`
      );
      toast.success("Deleted successfully!");
      fetchSeoData();
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      path: item.path,
      element: item.element,
      title: item.title,
      description: item.description,
      keywords: item.keywords,
    });
    setEditId(item._id);
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleSelectExisting = (e) => {
    const id = e.target.value;
    if (!id) {
      setEditId(null);
      setIsEditMode(false);
      setFormData({ path: "", element: "", title: "", description: "", keywords: "" });
      return;
    }
    const item = seoData.find((s) => s._id === id);
    if (item) {
      setFormData({
        path: item.path || "",
        element: item.element || "",
        title: item.title || "",
        description: item.description || "",
        keywords: item.keywords || "",
      });
      setEditId(item._id);
      setIsEditMode(true);
      setShowForm(true);
    }
  };

  return (
    <div className='max-w-6xl mx-auto p-6 mt-8'>
      {/* Toast Container */}
      <ToastContainer position='top-right' autoClose={3000} />

      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-semibold text-gray-800'>SEO Dashboard</h1>
        <div className='flex items-center gap-3'>
          <select
            className='px-3 py-2 border rounded-md'
            value={editId || ""}
            onChange={handleSelectExisting}
          >
            <option value=''>-- Select SEO to edit --</option>
            {seoData.map((item) => (
              <option key={item._id} value={item._id}>
                {item.path || item.title}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setIsEditMode(false);
              setEditId(null);
              setFormData({
                path: "",
                element: "",
                title: "",
                description: "",
                keywords: "",
              });
            }}
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          >
            {showForm ? "Close" : "Add SEO"}
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className='bg-white p-6 rounded shadow-md mb-8 space-y-4'
        >
          <div className='grid md:grid-cols-2 gap-4'>
            {/* <div>
              <label className='block text-sm font-medium'>Path</label>
              <input
                type='text'
                name='path'
                value={formData.path}
                onChange={handleChange}
                required
                className='w-full mt-1 px-4 py-2 border rounded-md'
              />
            </div> */}
            <div>
              <label className='block text-sm font-medium'>Path</label>
              <input
                type='text'
                name='path'
                value={formData.path}
                onChange={handleChange}
                required
                className='w-full mt-1 px-4 py-2 border rounded-md'
              />
              {pathError && <p className='text-red-500 text-sm'>{pathError}</p>}
            </div>

            {/* Element field hidden from UI but still set via route selection */}
            <div className='md:col-span-2'>
              <label className='block text-sm font-medium'>Title</label>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleChange}
                required
                className='w-full mt-1 px-4 py-2 border rounded-md'
              />
            </div>
            <div className='md:col-span-2'>
              <label className='block text-sm font-medium'>Description</label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className='w-full mt-1 px-4 py-2 border rounded-md'
              />
            </div>
            <div className='md:col-span-2'>
              <label className='block text-sm font-medium'>Keywords</label>
              <input
                type='text'
                name='keywords'
                value={formData.keywords}
                onChange={handleChange}
                required
                className='w-full mt-1 px-4 py-2 border rounded-md'
              />
            </div>
          </div>
          <button
            type='submit'
            className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
          >
            {isEditMode ? "Update SEO" : "Save SEO"}
          </button>
        </form>
      )}

      {/* Loader */}
      {loading ? (
        <div className='text-center text-gray-600 font-medium py-8'>
          Loading...
        </div>
      ) : (
        <div className='overflow-x-auto bg-white shadow-md rounded-md'>
          <table className='min-w-full table-auto'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='px-4 py-2 text-left'>Path</th>
                                <th className='px-4 py-2 text-left'>Title</th>
                <th className='px-4 py-2 text-left'>Description</th>
                <th className='px-4 py-2 text-left'>Keywords</th>
                <th className='px-4 py-2 text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {seoData.length > 0 ? (
                seoData.map((item) => (
                  <tr key={item._id} className='border-t'>
                    <td className='px-4 py-2'>{item.path}</td>
                                        <td className='px-4 py-2'>{item.title}</td>
                    <td className='px-4 py-2'>{item.description}</td>
                    <td className='px-4 py-2'>{item.keywords}</td>
                    <td className='px-4 py-2 flex space-x-2 text-lg'>
                      <button
                        onClick={() => handleEdit(item)}
                        className='text-blue-600 hover:text-blue-800'
                        title='Edit'
                      >
                        <AiFillEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className='text-red-600 hover:text-red-800'
                        title='Delete'
                      >
                        <AiFillDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='6' className='text-center py-4 text-gray-500'>
                    No SEO data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddSEO;
