// import React, { useState } from "react";
// import { assets } from "../assets/assets";
// import axios from "axios";
// import { backendURL } from "../App";
// import { toast } from "react-toastify";


// const Add = ({token}) => {

//   const [image1,setImage1]=useState(false)
//   const [image2,setImage2]=useState(false)
//   const [image3,setImage3]=useState(false)
//   const [image4,setImage4]=useState(false)

//   const [name,setName]=useState("")
//   const [description,setDescription]=useState("")
//   const [price,setPrice]=useState("")
//   const [category,setCategory]=useState("Men")
//   const [subCategory,setSubCategory]=useState("Topwear")
//   const [bestseller,setBestseller]=useState(false)
//   const [sizes,setSizes]=useState([])

//   const onSubmitHandler = async(e)=>{
//     e.preventDefault()

//     try {
//       const formData = new FormData()

//       formData.append("name",name)
//       formData.append("description",description)
//       formData.append("price",price)
//       formData.append("category",category)
//       formData.append("subCategory",subCategory)
//       formData.append("bestseller",bestseller)
//       formData.append("sizes",JSON.stringify(sizes))

//       image1 && formData.append("image1",image1)
//       image2 && formData.append("image2",image2)
//       image3 && formData.append("image3",image3)
//       image4 && formData.append("image4",image4)

//       const response = await axios.post(backendURL + "/api/product/add",formData,{headers:{token}})

//       if (response.data.success) {
//         toast.success(response.data.message)
//         setName('')
//         setDescription('')
//         setImage1(false)
//         setImage2(false)
//         setImage3(false)
//         setImage4(false)
//         setPrice('')
//       }else{
//         toast.error(response.data.message)
//       }



//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)

//     }
//   }

//   return (
//     <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-3">
//       <div>
//         <p className="mb-2">Upload Image</p>

//         <div className="flex gap-2">
//           <label htmlFor="image1">
//             <img className="w-20" src={!image1 ? assets.upload_area :URL.createObjectURL(image1)} alt="" />
//             <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
//           </label>
//           <label htmlFor="image2">
//             <img className="w-20" src={!image2 ? assets.upload_area :URL.createObjectURL(image2)} alt="" />
//             <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
//           </label>
//           <label htmlFor="image3">
//             <img className="w-20" src={!image3 ? assets.upload_area :URL.createObjectURL(image3)} alt="" />
//             <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
//           </label>
//           <label htmlFor="image4">
//             <img className="w-20" src={!image4 ? assets.upload_area :URL.createObjectURL(image4)} alt="" />
//             <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
//           </label>
//         </div>
//       </div>

//       <div className="w-full">
//         <p className="mb-2">Product Name</p>
//         <input
//           onChange={(e)=>setName(e.target.value)}
//           value={name}
//           className="w-full max-w-[500px] px-3 py-2"
//           type="text"
//           placeholder="Type here"
//           required
//         />
//       </div>

//       <div className="w-full">
//         <p className="mb-2">Product Description</p>
//         <textarea
//           onChange={(e)=>setDescription(e.target.value)}
//           value={description}
//           className="w-full max-w-[500px] px-3 py-2"
//           type="text"
//           placeholder="Write content here"
//         />
//       </div>

//       <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
//         <div>
//           <p className="mb-2">Product category</p>
//           <select onChange={(e)=> setCategory(e.target.value)} className="w-full px-3 py-2">
//             <option value="Men">Men</option>
//             <option value="Women">Women</option>
//             <option value="Kids">Kids</option>
//           </select>
//         </div>

//         <div>
//           <p className="mb-2">Sub category</p>
//           <select onChange={(e)=> setSubCategory(e.target.value)} className="w-full px-3 py-2">
//             <option value="Topwear">Topwear</option>
//             <option value="Bottomwear">Bottomwear</option>
//             <option value="Winterwear">Winterwear</option>
//           </select>
//         </div>

//         <div>
//           <p className="mb-2">Product Price</p>
//           <input
//             onChange={(e)=>setPrice(e.target.value)}
//             value={price}
//             className="w-full px-3 py-2 sm:w-[120px]"
//             type="number"
//             placeholder="Price"
//           />
//         </div>
//       </div>

//       <div>
//         <p className="mb-2">Product Sizes</p>
//         <div className="flex gap-3">
//           <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S"):[...prev,"S"])}>
//             <p className={`${sizes.includes("S") ? "bg-green-200" : "bg-slate-200"}  px-3 py-1 cursor-pointer`}>S</p>
//           </div>

//           <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M"):[...prev,"M"])}>
//             <p className={`${sizes.includes("M") ? "bg-green-200" : "bg-slate-200"}  px-3 py-1 cursor-pointer`}>M</p>
//           </div>

//           <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L"):[...prev,"L"])}>
//             <p className={`${sizes.includes("L") ? "bg-green-200" : "bg-slate-200"}  px-3 py-1 cursor-pointer`}>L</p>
//           </div>

//           <div onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL"):[...prev,"XL"])}>
//             <p className={`${sizes.includes("XL") ? "bg-green-200" : "bg-slate-200"}  px-3 py-1 cursor-pointer`}>XL</p>
//           </div>

//           <div onClick={()=>setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL"):[...prev,"XXL"])}>
//             <p className={`${sizes.includes("XXL") ? "bg-green-200" : "bg-slate-200"}  px-3 py-1 cursor-pointer`}>XXL</p>
//           </div>
//         </div>
//       </div> 

//       <div className="flex gap-2 mt-2">
//         <input onChange={()=> setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller"/>
//         <label className="cursor-pointer" htmlFor="bestseller">Add to bestseller</label>
//       </div>

//       <button className="w-28 py-3 mt-4 bg-black text-white" type="submit">ADD</button>
//     </form>
//   );
// };

// export default Add;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Add = () => {
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // 🆕
  const [name, setName] = useState("");
  const [category_category, setCategoryCategory] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [offer, setOffer] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/categories");
        const uniqueCategories = [...new Set(res.data.map(item => item.category_category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/category_product");
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category_category", category_category);
      formData.append("oldPrice", oldPrice);
      formData.append("newPrice", newPrice);
      formData.append("offer", offer);

      images.forEach((image) => formData.append("image", image));
      if (editingId) {
        await axios.put(`http://localhost:4000/api/category_product/${editingId}`, formData);
        toast.success("Product updated successfully!");
      } else {
        await axios.post("http://localhost:4000/api/category_product", formData);
        toast.success("Product added successfully!");
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      console.error("Error submitting product:", err);
      toast.error("Error submitting product.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setImages([]);
    setExistingImages([]); // 🆕
    setName("");
    setCategoryCategory("");
    setOldPrice("");
    setNewPrice("");
    setOffer("");
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setCategoryCategory(product.category_category);
    setOldPrice(product.oldPrice);
    setNewPrice(product.newPrice);
    setOffer(product.offer);
    setImages([]);
    setExistingImages(product.images || []); // 🆕
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (productId) => {
    setShowDeleteModal(true);
    setProductToDelete(productId);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/category_product/${productToDelete}`);
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product.");
    } finally {
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  return (
    <div>
      <form className="flex flex-col items-start gap-3" onSubmit={handleSubmit}>
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Product" : "Add Product"}
        </h3>

        <div>
          <p className="mb-2">Upload Images</p>
          {images.length === 0 && existingImages.length === 0 && (
            <label htmlFor="imageUpload" className="cursor-pointer">
              <img className="w-20 h-20 object-cover" src={assets.upload_area} alt="upload" />
            </label>
          )}
          <input type="file" id="imageUpload" hidden multiple accept="image/*" onChange={handleImageChange} />
          
          <div className="flex gap-2 mt-2 flex-wrap">
            {/* Show existing backend images */}
            {existingImages.map((img, index) => (
              <img key={`existing-${index}`} src={img} alt="existing" className="w-20 h-20 object-cover border rounded" />
            ))}
            {/* Show newly added images */}
            {images.map((img, index) => (
              <img key={`new-${index}`} src={URL.createObjectURL(img)} alt="new" className="w-20 h-20 object-cover border rounded" />
            ))}
          </div>
        </div>

        <div className="w-full">
          <p className="mb-2">Album Name</p>
          <input
            className="w-full max-w-[500px] px-3 py-2 border"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="w-full">
          <p className="mb-2">Album Category</p>
          <select
            className="px-3 py-2 w-full max-w-[500px] border"
            value={category_category}
            onChange={(e) => setCategoryCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Old Price</p>
            <input
              className="w-full px-3 py-2 sm:w-[120px] border"
              type="number"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
            />
          </div>

          <div>
            <p className="mb-2">New Price</p>
            <input
              className="w-full px-3 py-2 sm:w-[120px] border"
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </div>

          <div>
            <p className="mb-2">Offer</p>
            <input
              className="w-full px-3 py-2 sm:w-[120px] border"
              type="text"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className={`w-28 py-3 mt-4 ${loading ? "bg-gray-600" : "bg-black"} text-white`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              className="w-28 py-3 mt-4 bg-gray-600 text-white"
              type="button"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 className="text-lg font-semibold my-6">Products List</h3>
      <div>
        {products.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 text-xs sm:text-sm text-gray-700 relative"
          >
            <img className="w-12 h-12 object-cover" src={product.images[0] || assets.parcel_icon} alt="product" />
            <div>
              <p className="p-0.5"><span>ID: {product.category_id}</span></p>
              <p className="mt-3 mb-2 font-medium">Name: {product.name}</p>
              <p>Category: {product.category_category}</p>
            </div>

            <div>
              <p>Old Price: ₹{product.oldPrice}</p>
              <p>New Price: ₹{product.newPrice}</p>
              <p>Offer: {product.offer}</p>
            </div>

            <div></div>

            <div className="flex gap-2 justify-end sm:col-span-3 lg:col-span-1">
              <button
                onClick={() => handleEdit(product)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this product?</p>
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

export default Add;
