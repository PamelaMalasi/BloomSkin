import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { UserContext } from './UserContext';

const InfluencerPhoto = () => {
  const { userInfo } = useContext(UserContext);
  const [photo, setPhoto] = useState(null);
  const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo) return;

    const formData = new FormData();
    formData.append('photo', photo);

    try {
      await axios.post('http://localhost:5001/influencer/upload', formData);
      setSuccess(true);
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  if (!userInfo || userInfo.role !== "admin") {
    return <p className="text-center mt-5">Access denied. Admins only.</p>;
  }

return (
    <Container className="my-5" style={{height: '600px'}}>
      <h2 className="text-center mb-4">Upload Influencer Photo</h2>

      {success && (
        <Alert variant="success" className="text-center">Photo uploaded successfully!</Alert>
      )}
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      <Form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-50 w-md-75 w-lg-50 mx-auto"
      >
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose an image</Form.Label>
          <Form.Control
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit">
            Upload
          </Button>
        </div>
      </Form>
      
      {photo && (
        <div className="mt-4 text-center">
          <img
            src={URL.createObjectURL(photo)}
            alt="Preview"
            className="img-fluid"
            style={{ maxWidth: '300px', borderRadius: '20px', objectFit: 'cover' }}
          />
        </div>
      )}
    </Container>
  );
};

export default InfluencerPhoto;