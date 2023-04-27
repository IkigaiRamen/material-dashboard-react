
 import React, { useState, useEffect } from 'react';

 // @mui material components
 import Grid from '@mui/material/Grid';
 
 //    components
 import MDBox from 'components/MDBox';
 import MDTypography from 'components/MDTypography';
 
 //    example components
 import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
 import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
 import Footer from 'examples/Footer';
 
 // Overview page components
 import Header from 'layouts/profile/components/Header';
 
 function ProfileScreen() {
  const [userInfo, setUserInfo] = useState("");

   console.log(userInfo,userInfo._id)
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setUserInfo(userInfo);
    }
    console.log(userInfo,userInfo._id)

     const fetchUser = async () => {
       try {
      
         const response = await fetch(`http://localhost:5000/api/users/${userInfo._id}`);
         const data = await response.json();
         setUser(data);
         setLoading(false);
       } catch (error) {
         console.error('Error fetching user:', error);
       }
     };
 
     fetchUser();
   }, [userInfo._id]);
 
   if (loading) {
     return <div>Loading...</div>;
   }
 
   if (!user) {
     return <div>User not found</div>;
   }
 
   return (
     <DashboardLayout>
       <DashboardNavbar />
       <MDBox mb={2} />
       <Header>
         <MDBox mt={5} mb={3}>
           <Grid container spacing={1}>
             <Grid item xs={12} md={6} xl={4}>
               <MDTypography variant="h6" fontWeight="medium">
                 User Details
               </MDTypography>
               <MDBox mt={2}>
                 <p>First Name: {user.firstname}</p>
                 <p>Last Name: {user.lastname}</p>
                 <p>Email: {user.email}</p>
                 <p>Address: {user.address}</p>
                 <p>Address Number: {user.adressNumber}</p>
                 <p>City: {user.city}</p>
                 <p>Number: {user.number}</p>
                 <p>Zip: {user.zip}</p>
                 <p>Birthday: {user.birthday}</p>
                 <p>Gender: {user.gender}</p>
                 <p>Phone: {user.phone}</p>
               </MDBox>
             </Grid>
           </Grid>
         </MDBox>
       </Header>
       <Footer />
     </DashboardLayout>
   );
 }
 
 export default ProfileScreen;
 