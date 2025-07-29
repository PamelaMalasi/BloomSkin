import React, { useEffect, useState, useContext } from 'react';
import { Container, Card, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { UserContext } from "./UserContext";
import axios from 'axios';
import "./Sectionse.css";

const Sectionse = () => {
  const [photos, setPhotos] = useState([]);
  const { id } = useParams();
  const nav = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 992 }, items: 4 },
    tablet: { breakpoint: { max: 992, min: 768 }, items: 2 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 }
  };

  //get influencer 
  useEffect(() => {
    axios.get("http://localhost:5001/influencer/all")
      .then((res) => setPhotos(res.data))
      .catch((err) => console.error("Error fetching influencer photos:", err));
  }, []);

  const handleDelete = async (photoId) => {
    await axios
      .delete(`http://localhost:5001/influencer/deleteInfluencer/${photoId}`)
      .then(() => {
        setPhotos(photos.filter((photo) => photo._id !== photoId));
      })
      .catch((err) => console.log("Not deleted: " + err));
  };




  return (
    <div className="container section7">
      <div className="sectionse-text">
        <p style={{ fontWeight: 'bold' }}>Our Blooming Community</p>
        <p className="below-text">You and BloomSkin radiating</p>
      </div>

      <Container className="my-6">
        <MultiCarousel responsive={responsive} autoPlay infinite arrows>
          {photos.map((photo) => (
            <Card className="mx-3 product-card" key={photo._id}>
              <Card.Img
                variant="top"
                src={`http://localhost:5001/images/${photo.photo}`}
                className="product-img1"
              />
              <>
              </>
              {userInfo.role === "admin" && (
      <div style={{ textAlign: 'center' }}>
                <Button 
                style={{width: '100px', borderRadius: '20px', marginTop: '20px'}}
                  variant="danger"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this photo?")) {
                      handleDelete(photo._id);
                    }
                  }}
                >
                  Delete
                </Button>
                </div>

              )}


            </Card>
          ))}
        </MultiCarousel>
      </Container>
    </div>
  );
};

export default Sectionse;
