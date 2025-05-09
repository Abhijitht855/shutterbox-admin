// import React from 'react'
// import { assets } from "../assets/assets";


// const Category = () => {
//     return (
//         <div>
//             <form className="flex flex-col items-start gap-3">
//                 <div>
//                     <p className="mb-2">Upload Image</p>
//                     <div className="flex gap-2">
//                         {[1].map((num) => (
//                             <label key={num} htmlFor={`image${num}`}>
//                                 <img className="w-20" src={assets.upload_area} alt="" />
//                                 <input type="file" id={`image${num}`} hidden />
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="w-full">
//                     <p className="mb-2">Category Name</p>
//                     <input className="w-full max-w-[500px] px-3 py-2 " type="text" placeholder="Type here" required />
//                 </div>

//                 <div className="w-full">
//                     <p className="mb-2">Category </p>
//                     <input className="w-full max-w-[500px] px-3 py-2 " type="text" placeholder="Type here" required />
//                 </div>



//                 <button className="w-28 py-3 mt-4 bg-black text-white" type="submit">ADD</button>
//             </form>
//         </div>
//     )
// }

// export default Category

import React, { useState, useEffect } from 'react';
import { assets } from "../assets/assets";
import axios from 'axios';
import { toast } from 'react-toastify';

const Category = () => {
    const [image, setImage] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [categoryCategory, setCategoryCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [editLoading, setEditLoading] = useState(false);


    // Modal states
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);


    const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState({
        _id: '',
        category_name: '',
        category_category: '',
        category_image: null
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/categories');
            setCategories(response.data || []);
        } catch (error) {
            toast.error("Failed to load categories");
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image || !categoryName || !categoryCategory) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("category_name", categoryName);
            formData.append("category_category", categoryCategory);
            formData.append("category_image", image);

            const response = await axios.post("http://localhost:4000/api/categories", formData);
            toast.success(response.data.message);

            setImage(null);
            setCategoryName('');
            setCategoryCategory('');
            fetchCategories();
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (id) => {
        setCategoryToDelete(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/categories/${categoryToDelete}`);
            toast.success(response.data.message);
            fetchCategories();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete category");
        } finally {
            setShowDeleteModal(false);
            setCategoryToDelete(null);
        }
    };

    const openEditModal = (cat) => {
        setEditData({
            _id: cat._id,
            category_name: cat.category_name,
            category_category: cat.category_category,
            category_image: null,
        });
        setShowEditModal(true);
    };

    const handleEditImageChange = (e) => {
        setEditData({ ...editData, category_image: e.target.files[0] });
    };

    const handleEditSubmit = async () => {
        setEditLoading(true);
        try {
            const formData = new FormData();
            formData.append("category_name", editData.category_name);
            formData.append("category_category", editData.category_category);
            if (editData.category_image) {
                formData.append("category_image", editData.category_image);
            }

            const response = await axios.put(`http://localhost:4000/api/categories/${editData._id}`, formData);
            toast.success(response.data.message);
            fetchCategories();
            setShowEditModal(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update category");
        } finally {
            setEditLoading(false);
        }
    };


    return (
        <div>
            <form className="flex flex-col items-start gap-3 mb-10" onSubmit={handleSubmit}>
                {/* Form Fields */}
                <div>
                    <p className="mb-2">Upload Image</p>
                    <label htmlFor="imageUpload">
                        <img className="w-20 cursor-pointer" src={image ? URL.createObjectURL(image) : assets.upload_area} alt="upload preview" />
                        <input type="file" id="imageUpload" hidden onChange={handleImageChange} />
                    </label>
                </div>

                <div className="w-full">
                    <p className="mb-2">Category Name</p>
                    <input
                        className="w-full max-w-[500px] px-3 py-2 border rounded"
                        type="text"
                        placeholder="Type here"
                        required
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </div>

                <div className="w-full">
                    <p className="mb-2">Category</p>
                    <input
                        className="w-full max-w-[500px] px-3 py-2 border rounded"
                        type="text"
                        placeholder="Type here"
                        required
                        value={categoryCategory}
                        onChange={(e) => setCategoryCategory(e.target.value)}
                    />
                </div>

                <button
                    className={`w-28 py-3 mt-4 text-white rounded ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'ADD'}
                </button>
            </form>

            {/* Category List */}
            <h3 className="text-lg font-semibold mb-4">Categories List</h3>
            <div className="space-y-4">
                {categories.map((cat) => (
                    <div
                        key={cat._id}
                        className="border-2 border-gray-400 w-[800px] flex justify-between items-center p-5"
                    >
                        <div className='flex space-x-5'>
                            <img className="w-12 h-12 object-cover" src={cat.category_image || assets.parcel_icon} alt="category" />
                            <div>
                                <p><strong>ID:</strong> {cat.category_id}</p>
                                <p><strong>Name:</strong> {cat.category_name}</p>
                                <p><strong>Category:</strong> {cat.category_category}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button
                                className="p-2 font-semibold hover:underline"
                                onClick={() => openEditModal(cat)}
                            >
                                Edit
                            </button>
                            <button
                                className="p-2 font-semibold text-red-600 hover:underline"
                                onClick={() => confirmDelete(cat._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this category?</p>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Edit Category</h2>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border mb-3 rounded"
                            value={editData.category_name}
                            onChange={(e) => setEditData({ ...editData, category_name: e.target.value })}
                        />
                        <input
                            type="text"
                            className="w-full px-3 py-2 border mb-3 rounded"
                            value={editData.category_category}
                            onChange={(e) => setEditData({ ...editData, category_category: e.target.value })}
                        />
                        <input type="file" onChange={handleEditImageChange} className="mb-4 p-4" />
                        <div className="mt-4 flex justify-end space-x-4">
                            <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={() => setShowEditModal(false)}>Cancel</button>
                            <button
                                className={`px-4 py-2 text-white rounded ${editLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                onClick={handleEditSubmit}
                                disabled={editLoading}
                            >
                                {editLoading ? 'Processing...' : 'Update'}
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Category;
