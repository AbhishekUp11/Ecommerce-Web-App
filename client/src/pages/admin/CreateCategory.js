import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

const CreateCategory = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [name, setName] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);


  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/all-category`);
      if (data.success) {
        setAllCategories(data.categories);
      }
    } catch (error) {
      toast.error("Something went wrong in getting catgeory");
    }
  };
  useEffect( ()=> {
    getCategories();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const data = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, {
        name
      });
      if(data?.data?.success){
        toast.success(`${name} Created Successfully`);
        getCategories()
      }

    }catch(error){
      toast.error("Error in createing Category")
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault()
    try{
      const data = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, {
        name: updatedName
      });
      if(data?.data?.success){
        setVisible(false)
        toast.success(`${updatedName} Updated Successfully`)
        getCategories();
      }

    }catch(error){
      toast.error("Error in updating Product")
    }
  };

  const handleDelete = async (pId) => {
    try {
      const data = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`
      );
      if (data?.data?.success) {
        toast.success(`category is deleted`);
        getCategories();
      } else {
        toast.error(data?.data?.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allCategories.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div> 
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
