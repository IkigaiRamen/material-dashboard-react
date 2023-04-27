import { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import MDTypography from "components/MDTypography";
import { useParams } from "react-router-dom";
import MDBox from "components/MDBox";
import bgImage from "assets/images/istockphoto.jpeg";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { Card, CardContent, CardMedia, Link } from "@mui/material";
import MDButton from "components/MDButton";

function ProductDetail(props) {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [topBids,setTopBids]=useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
    fetchTopBids();
  }, [id]);


    const fetchTopBids = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/topBidders/${id}`);
        setTopBids(data);
        console.log(data)
      } catch (err) {
        console.error(err.message);
      }
    };
  return (
    <CoverLayout image={bgImage}>
   
    <Container maxWidth="md">
      <Card item xs={12} sm={6} md={4}>
      <CardMedia
                  component="img"
                  alt={product.name}
                  height="250"
                  image={`../..${product.imageUrl}`}
                  title={product.name}
                />
        <CardContent>
          <MDTypography variant="h2">{product.name}</MDTypography>
          <MDTypography variant="body1">{product.description}</MDTypography>
          <MDTypography variant="body1">Starting Price: ${product.startingPrice}</MDTypography>
          <MDTypography variant="body1">Current Price: ${product.currentPrice}</MDTypography>
          <MDTypography variant="body1">Bidding End Time: {product.biddingEndTime}</MDTypography>
        <h2>BIDS</h2>
        <Link to={`/auctionList/`}>
          <MDButton variant="contained"
                   color="error" type='submit' fullWidth className="submit-btn">
            Back to List 
          </MDButton>
          </Link>
        </CardContent>
      </Card>
      </Container>
   
    </CoverLayout>
  );
}

export default ProductDetail;
