import React, {useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";

import MDInput from 'components/MDInput';
import MDAlert from 'components/MDAlert';
import MDButton from 'components/MDButton';
import MDSnackbar from 'components/MDSnackbar';
import MDTypography from "components/MDTypography";
import './update.css'
import {
  Form,
  Button,
  Row,
  Col,
  Container,
} from 'react-bootstrap';


const UpdateProjectForm = () => {
  const {id} = useParams()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate=useNavigate();

  

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedProjectData = {
      title: title,
      description: description,
      amount: amount,
    };

    axios.put(`http://localhost:5000/api/fundMe/updateProjects/${id}`, updatedProjectData)
      .then(response => {
        console.log('Project updated successfully!');
        navigate('/fundMe/project-ideas');
      })
      .catch(error => {
        setErrorMessage('An error occurred while updating the project.');
        console.error(error);
      });
  }
  return (
  <DashboardLayout>
  <DashboardNavbar />
  <MDBox textAlign="center" marginTop="100px">
    <MDTypography variant="h2" gutterBottom>
      Update your project idea and let others fund it!
    </MDTypography>
    <form onSubmit={handleSubmit}>
      <MDBox display="flex" flexDirection="column" alignItems="center">
        <MDInput
          id="title"
          label="Title *"
          placeholder="Enter title"
          value={title}
          required
          onChange={(event) => setTitle(event.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          inputProps={{ maxLength: 100 }}
        />
        <MDInput
          id="description"
          label="Description *"
          placeholder="Enter description"
          value={description}
          required
          onChange={(event) => setDescription(event.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={3}
          inputProps={{ maxLength: 500 }}
        />
        <MDInput
          id="amount"
          label="Amount *"
          placeholder="Enter funding amount"
          value={amount}
          required
          onChange={(event) => setAmount(event.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          type="number"
        />
        <MDBox marginTop="24px">
          <MDButton variant="contained" color="primary" type="submit">
            Update Project
          </MDButton>
        </MDBox>
      </MDBox>
    </form>
  </MDBox>
</DashboardLayout>
);
};
export default UpdateProjectForm;
