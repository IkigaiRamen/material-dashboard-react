import { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import MDTypography from "components/MDTypography";
import { useParams } from "react-router-dom";

function ProductDetail(props) {
  const [product, setProduct] = useState({});
  const { id } = useParams();

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
  }, [id]);

  return (
    <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

      <Row>
        <Col>
          <Image src={product.imageUrl} fluid />
        </Col>
        <Col>
          <MDTypography variant="h2">{product.name}</MDTypography>
          <MDTypography variant="body1">{product.description}</MDTypography>
          <MDTypography variant="body1">Starting Price: ${product.startingPrice}</MDTypography>
          <MDTypography variant="body1">Current Price: ${product.currentPrice}</MDTypography>
          <MDTypography variant="body1">Bidding End Time: {product.biddingEndTime}</MDTypography>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
