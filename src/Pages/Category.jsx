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
    const [editingCategory, setEditingCategory] = useState(null);
    const [listLoading, setListLoading] = useState(true);


    // Delete modal state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setListLoading(true);
        try {
            const response = await axios.get('http://localhost:4000/api/categories');
            setCategories(response.data || []);
        } catch (error) {
            toast.error("Failed to load categories");
        } finally {
            setListLoading(false);
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

    const confirmDeletePrompt = (category) => {
        setCategoryToDelete(category);
        setShowDeleteModal(true);
    };

    const cancelDelete = () => {
        setCategoryToDelete(null);
        setShowDeleteModal(false);
    };

    const confirmDelete = async () => {
        if (!categoryToDelete) return;
        try {
            const response = await axios.delete(`http://localhost:4000/api/categories/${categoryToDelete._id}`);
            toast.success(response.data.message);
            fetchCategories();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete category");
        } finally {
            setCategoryToDelete(null);
            setShowDeleteModal(false);
        }
    };

    const handleEdit = (cat) => {
        setEditingCategory(cat);
        setCategoryName(cat.category_name);
        setCategoryCategory(cat.category_category);
        window.scrollTo({ top: 0, behavior: "smooth" });

    };

    const handleEditSubmit = async () => {
        setEditLoading(true);
        try {
            const formData = new FormData();
            formData.append("category_name", categoryName);
            formData.append("category_category", categoryCategory);
            if (image) {
                formData.append("category_image", image);
            }

            const response = await axios.put(`http://localhost:4000/api/categories/${editingCategory._id}`, formData);
            toast.success(response.data.message);
            fetchCategories();
            setEditingCategory(null);
            setCategoryName('');
            setCategoryCategory('');
            setImage(null);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update category");
        } finally {
            setEditLoading(false);
        }
    };

    return (
        <div>
            {/* Edit or Add Category Form */}
            {editingCategory ? (
                <div className="flex flex-col items-start gap-3 mb-10">
                    <h3 className="text-lg font-semibold mb-4">Edit Category</h3>

                    <div>
                        <p className="mb-2">Upload Image</p>

                        <div className="relative w-20 h-20">
                            {/* Image button for upload */}
                            <img
                                src={assets.upload_area}
                                alt="upload"
                                className="w-full h-full object-cover cursor-pointer"
                            />

                            {/* File input styled to sit over the image */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>

                        {/* Preview below */}
                        <div className="mt-3">
                            {image ? (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="preview"
                                    className="w-20 h-20 object-cover"
                                />
                            ) : editingCategory?.category_image ? (
                                <img
                                    src={editingCategory.category_image}
                                    alt="existing"
                                    className="w-20 h-20 object-cover "
                                />
                            ) : null}
                        </div>
                    </div>




                    <div className="w-full">
                        <p className="mb-2">Category Name</p>
                        <input
                            className="w-full max-w-[500px] px-3 py-2 border rounded"
                            type="text"
                            placeholder="Type here"
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
                            value={categoryCategory}
                            onChange={(e) => setCategoryCategory(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            className={`w-28 py-3 mt-4 text-white ${editLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
                            onClick={handleEditSubmit}
                            disabled={editLoading}
                        >
                            {editLoading ? 'Processing...' : 'Update'}
                        </button>
                        <button
                            className="w-28 py-3 mt-4 text-white bg-gray-500 hover:bg-gray-600"
                            onClick={() => {
                                setEditingCategory(null);
                                setImage(null);
                                setCategoryName('');
                                setCategoryCategory('');
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <form className="flex flex-col items-start gap-3 mb-10" onSubmit={handleSubmit}>
                    <h3 className="text-lg font-semibold mb-4">Add Category</h3>

                    <div>
                        <p className="mb-2">Upload Image</p>
                        <div>

                            <label htmlFor="imageUpload">
                                <img
                                    className="w-20 h-20 object-cover cursor-pointer"
                                    src={assets.upload_area}
                                    alt="upload"
                                />
                                <input
                                    type="file"
                                    id="imageUpload"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageChange}
                                />
                            </label>

                            {/* Preview image below the upload box */}
                            {image && (
                                <div className="mt-3">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="preview"
                                        className="w-20 h-20 object-cover"
                                    />
                                </div>
                            )}
                        </div>

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
                        className={`w-28 py-3 mt-4 text-white ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'ADD'}
                    </button>
                </form>
            )}

            {/* Category List */}
            <h3 className="text-lg font-semibold mb-4">Categories List</h3>
            <div>
                {listLoading ? (
                    <div className="text-center py-8 text-gray-500">Loading categories...</div>
                ) : categories.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">No categories found.</div>
                ) : (
                    categories.map((cat) => (
                        <div
                            key={cat._id}
                            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 text-xs sm:text-sm text-gray-700 relative"
                        >
                            <img
                                className="w-12 h-12 object-cover"
                                src={cat.category_image || assets.parcel_icon}
                                alt="category"
                            />

                            <div>
                                <p className="p-0.5"><span>ID: {cat.category_id}</span></p>
                                <p className="mt-3 mb-2 font-medium">Name: {cat.category_name}</p>
                                <p>Category: {cat.category_category}</p>
                            </div>
                            <div></div>
                            <div></div>
                            <div className="flex gap-2 justify-end sm:col-span-3 lg:col-span-1">
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    onClick={() => handleEdit(cat)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    onClick={() => confirmDeletePrompt(cat)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>


            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                        <p>Are you sure you want to delete <span className="font-medium">{categoryToDelete?.category_name}</span>?</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={cancelDelete} className="bg-gray-300 text-black px-4 py-2 rounded">Cancel</button>
                            <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Category;
