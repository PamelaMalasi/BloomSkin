import React, { useState, useContext, useEffect } from "react";
import { Container, Form, Button, Row, Col, Image,  Alert, Card  } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";


const CreateItem = () => {
  
  const navigate = useNavigate();

  const { userInfo } = useContext(UserContext);
  const [error, setError] = useState("");
 
  const [newItem, setNewItem] = useState({
    name: ''
    ,
    description: ""
    ,
    photo: "",
    category: "",
    price: "", 
  })
  //state i afishimit te imazhit
  const [uploadedImage, setUploadedImage] = useState(null);
  
  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value })
  }

  const handlePhoto = (e) => {
    setNewItem({ ...newItem, photo: e.target.files[0] })
    setUploadedImage(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();

    Object.entries(newItem).forEach(([key, value]) => {
      formData.append(key, value);
    });
   
    if (!userInfo || !userInfo.id) {
      alert("You must be logged in to create an item.");
      return;
    }
    formData.append('userId', userInfo.id);


    await axios
      .post("http://localhost:5001/item/create", formData)
      .then((res) => {
        // Testimi
        console.log(res.data);
    
        navigate("/readAllItem");
      })
      
      .catch((err) => {
        console.log("Error server, Item not created" + err);
      });
  };
 return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Create New Product</h2>

      <Row className="g-4">
        <Col md={6}>
          <Card className="p-4 shadow-sm rounded-4">
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={newItem.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={newItem.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={newItem.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="skin">Skin</option>
                  <option value="sets">Sets</option>
                  <option value="bestsellers">Bestsellers</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price ($)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={newItem.price}
                  onChange={handleChange}
                  placeholder="Enter product price"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="photo"
                  accept=".jpeg, .png, .jpg"
                  onChange={handlePhoto}
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button
                  type="submit"
                  variant="dark"
                  className="w-100 rounded-pill"
                >
                  Create Item
                </Button>
              </div>

              {error && (
                <Alert variant="danger" className="mt-3 text-center">
                  {error}
                </Alert>
              )}
            </Form>
          </Card>
        </Col>

        <Col md={6} className="text-center">
          <h4 className="mb-3">Image Preview</h4>
          <Card className="p-3 shadow-sm">
            {uploadedImage ? (
              <Image
                src={uploadedImage}
                fluid
                rounded
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            ) : (
              <p className="text-muted">No image selected</p>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateItem;