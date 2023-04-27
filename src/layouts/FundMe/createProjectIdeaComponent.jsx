import React, { props, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import createImage from './create.jpeg'
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import './create.css'
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
} from 'react-bootstrap';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';

const CreateProjectIdea = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fundingGoal, setFundingGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`http://localhost:5000/api/fundMe/createProject`, { title, description, fundingGoal }, config);
      setTitle('');
      setDescription('');
      setFundingGoal('');
      setLoading(false);
      navigate('/fundMe/project-ideas');
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message || err.message);
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container>
        <MDTypography variant="h1" fontWeight="medium" style={{ marginTop: '100px', textAlign: 'center' }}>
          Create your own project idea and let others fund it!
        </MDTypography>
        <Form onSubmit={submitHandler}>
          <Row>
            <Col md={5} style={{ marginTop: '30px' }}>
              <MDBox>
                <MDTypography variant="h6" fontWeight="medium">
                  Title <span style={{ color: 'red' }}>*</span>
                </MDTypography>
                <MDInput
                  type='text'
                  placeholder='Enter title'
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </MDBox>
              <MDBox>
                <MDTypography variant="h6" fontWeight="medium">
                  Description <span style={{ color: 'red' }}>*</span>
                </MDTypography>
                <MDInput
                  type="text"
                  as="textarea"
                  rows={3}
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </MDBox>
              <MDBox>
                <MDTypography variant="h6" fontWeight="medium">
                  Funding Goal <span style={{ color: 'red' }}>*</span>
                </MDTypography>
                <MDInput
                  type='number'
                  placeholder='Enter funding goal'
                  value={fundingGoal}
                  required
                  onChange={(e) => setFundingGoal(e.target.value)}
                />
              </MDBox>
              <MDButton variant='contained' color='primary' type='submit' style={{ marginTop: '20px' }}>
                Submit
              </MDButton>
            </Col>
            <Col md={7}>
              <img src={createImage} alt='project' style={{ maxWidth: '100%' }} />
            </Col>
          </Row>
        </Form>
      </Container>
    </DashboardLayout>
  );
  }
export default CreateProjectIdea