import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDPagination from "components/MDPagination";

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
    
    <MDBox onSubmit={handleFormSubmit} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>Product Form</h2>
      <Form >
        <Form.Group controlId="productName">
          <Form.Label>Name</Form.Label>
          <MDInput
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="productDescription">
          <Form.Label>Description</Form.Label>
          <MDInput
            type="textarea"
            placeholder="Enter product description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="productImageUrl">
          <Form.Label>Image</Form.Label>
          <MDInput
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
          />
        </Form.Group>
        
        <Form.Group controlId="productStartingPrice">
          <Form.Label>Starting Price</Form.Label>
          <MDInput
            type="number"
            placeholder="Enter starting price"
            value={startingPrice}
            onChange={(event) => setStartingPrice(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="productCurrentPrice">
          <Form.Label>Current Price</Form.Label>
          <MDInput
            type="number"
            placeholder="Enter current price"
            value={currentPrice}
            onChange={(event) => setCurrentPrice(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="productBiddingEndTime">
          <Form.Label>Bidding End Time</Form.Label>
          <MDInput
            type="datetime-local"
            placeholder="Enter bidding end time"
            value={biddingEndTime}
            onChange={(event) => setBiddingEndTime(event.target.value)}
          />
        </Form.Group>

        <MDButton variant="Danger" type="submit">
          Submit
        </MDButton>
      </Form>

    
    </MDBox>
   
  );
}
export default UploadFormProduct;
