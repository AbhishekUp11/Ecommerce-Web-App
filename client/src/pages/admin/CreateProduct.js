import React, {useEffect, useState} from 'react'
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from "antd";
const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [shipping, setShipping] = useState("");
  const [category, setCategory] = useState("");

  const getAllCategory = async () => { 
    try{
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-category`);
      console.log("data", data)
      if(data?.success){
        setCategories(data?.categories)
      }
    } catch(error){
      console.log(error)
      toast.error("Something went wrong in getting categories")
    }
  }

  useEffect( () => {
    getAllCategory(); 
  }, []);

  const handleCreate = async (e) =>{
    e.preventDefault();
    try{
      const productData = new FormData();
      productData.append('name', name)
      productData.append('description', description)
      productData.append('price', price)
      productData.append('quantity', quantity)
      productData.append('category', category)
      productData.append('photo', photo)
      productData.append('shipping', shipping)

      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`,
      productData
      );
      if(data?.success){
        toast.success(`${name} product created successfully`) 
      }
    }catch(error){
      console.log(error)
      toast.error(`Error in creating Product ${name}`)
    }
  }

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <input
                 type="text"
                 value={description}
                 placeholder="Write a description"
                 className="form-control"
                 onChange={(e) => setDescription(e.target.value)}
                 />
              </div>
              <div className='mb-3'>
                <input
                 type='number'
                 value={price}
                 placeholder='Enter Price'
                 className='form-control'
                 onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <input
                  type='number'
                  value={quantity}
                  placeholder='Enter quantity'
                  className='form-control'
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
