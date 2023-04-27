import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDPagination from "components/MDPagination";
import bgImage from "assets/images/istockphoto.jpeg";
import CoverLayout
 from "layouts/authentication/components/CoverLayout";
 import Card from "@mui/material/Card";
 import { Link } from 'react-router-dom';

function UploadFormProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [startingPrice, setStartingPrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [biddingEndTime, setBiddingEndTime] = useState("");
  const [products, setProducts] = useState([]);
  const [productslist, setProductslist] = useState([]);
  const id = JSON.parse(localStorage.getItem('userInfo'));
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${id.token}`,
    },
  };
  
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/products`);
      setProductslist(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    /*
      route accepts an object with the following key-value pairs
      don't use a formData obj
      just send the obj as is, just like in the POSTMAN
    */
    
    const data = {
      name,
      description,
      imageUrl,
      startingPrice,
      currentPrice,
      biddingEndTime,
      id
    };

    addProduct(data);
    fetchProducts();
  };

  const addProduct = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/products/",formData );

      // POST requests generate a 201 HTTP response code rather than 200
      if (response.status === 201) {
        const product = response.data;
        console.log(response);
        setProducts([...products, product]);
        alert("Product added successfully!");
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      alert("Failed to add product.");
    }
  };

  return (
    <CoverLayout image={bgImage}>
      
    <Card>
    <MDBox
           variant="gradient"
           bgColor="secondary"
           borderRadius="lg"
           coloredShadow="secondary"
           mx={2}
           mt={-3}
           p={3}
           mb={1}
           textAlign="center"
         >
    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
    Product Form
    </MDTypography>
    </MDBox>
    <MDBox pt={4} pb={3} px={3}>
    <MDBox component="form" role="form">
    <MDBox mb={2}>
    <MDInput
    type="text"
    label="Name"
    variant="standard"
    fullWidth
    value={name}
    required
    onChange={(e) => setName(e.target.value)}
    />
    </MDBox>
    <MDBox mb={2}>
    <MDInput
    type="textarea"
    label="Description"
    variant="standard"
    fullWidth
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    />
    </MDBox>
    <MDBox mb={2}>
    <MDInput
    type="text"
    label="Image"
    variant="standard"
    fullWidth
    value={imageUrl}
    required
    onChange={(e) => setImageUrl(e.target.value)}
    />
    </MDBox>
    <MDBox mb={2}>
    <MDInput
    type="number"
    label="Starting Price"
    variant="standard"
    fullWidth
    value={startingPrice}
    onChange={(e) => setStartingPrice(e.target.value)}
    />
    </MDBox>
    <MDBox mb={2}>
    <MDInput
    type="number"
    label="Current Price"
    variant="standard"
    fullWidth
    value={currentPrice}
    required
    onChange={(e) => setCurrentPrice(e.target.value)}
    />
    </MDBox>
    <MDBox mb={2}>
    <MDInput
    type="datetime-local"
    label="Bidding End Time"
    variant="standard"
    fullWidth
    required
    value={biddingEndTime}
    onChange={(e) => setBiddingEndTime(e.target.value)}
    />
    </MDBox>
    <MDBox mt={4} mb={1}>
    <MDBox mt={4} mb={1}>
    <MDButton
                   variant="gradient"
                   color="info"
                   fullWidth
                   onClick={handleFormSubmit}
                 >
    Submit
    </MDButton>
    
    <Link to={`/auctionList/`}>
          <MDButton variant="contained"
                   color="error" type='submit' fullWidth className="submit-btn">
            Back to List 
          </MDButton>
          </Link>
    </MDBox>
    </MDBox>
    </MDBox>
    </MDBox>
    </Card>
    </CoverLayout>
    );
}
export default UploadFormProduct;
