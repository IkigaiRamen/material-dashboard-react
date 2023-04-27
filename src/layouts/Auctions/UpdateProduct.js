import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import axios from "axios";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import bgImage from "assets/images/istockphoto.jpeg";
function UpdateProduct() {
  const {id} = useParams()

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  const [startingPrice, setStartingPrice] = useState(0);
 
  const [biddingEndTime, setBiddingEndTime] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  
  

  const handleSubmit = (event) => {
    event.preventDefault();

    const updateproductData = {
      name: name,
      description: description,
      startingPrice: startingPrice,
      biddingEndTime:biddingEndTime,
    };

    axios.put(`http://localhost:5000/api/products/${id}`, updateproductData 
      )
      .then(response => {
        alert('Product updated successfully!');
      })
      .catch(error => {
        console.error(error);
        alert("Failed to update product.");
      });
    }
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
      Update Your Product
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
                     onClick={handleSubmit}
                   >
      Update
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

export default UpdateProduct;        
