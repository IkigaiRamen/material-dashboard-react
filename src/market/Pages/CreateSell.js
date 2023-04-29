import { useState } from 'react';
import { Form, Button, Col, Spinner, Alert } from 'react-bootstrap';
import { createProduct } from '../services/productData';
import SimpleSider from '../components/Siders/SimpleSider';
import '../components/CreateSell/CreateSell.css';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
  
    const onChangeHandler = (e) => {
      e.preventDefault();
      const { name, value, files } = e.target;
      if (name === 'title') setTitle(value);
      if (name === 'price') setPrice(value);
      if (name === 'description') setDescription(value);
      if (name === 'city') setCity(value);
      if (name === 'category') setCategory(value);
      if (name === 'image' && files) setImage(files[0]);
    };
  
    const onSubmitHandler = (e) => {
      e.preventDefault();
      const obj = { title, price, description, city, category };
      setLoading(true);
      getBase64(image)
        .then((data) => {
          obj['image'] = data;
          createProduct(obj)
            .then((res) => {
              if (res.error) {
                setLoading(false);
                setErrors(res.error);
                setAlertShow(true);
              } else {
                navigate(`/categories/${category}/${res.productId}/details`);
              }
            })
            .catch((err) => console.error('Creating product err: ', err));
        })
        .catch((err) => console.error('Converting to base64 err: ', err));
    };
  
    const getBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };
        return (
            <>
                <SimpleSider />
                <div className='container'>
                    <h1 className="heading">Add a Product</h1>
                    <Form onSubmit={onSubmitHandler}>
                      
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter title" name="title" required                onChange={(e) => setTitle(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" step="0.01" placeholder="Price" name="price" required                 onChange={(e) => setPrice(e.target.value)} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridDescription.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" required                 onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control name="city" placeholder="Sofia" required                 onChange={(e) => setCity(e.target.value)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCategory">
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" defaultValue="Choose..." name="category" required                 onChange={(e) => setCategory(e.target.value)}>
                                    <option>Choose...</option>
                                    <option>properties</option>
                                    <option>auto</option>
                                    <option>electronics</option>
                                    <option>clothes</option>
                                    <option>toys</option>
                                    <option>home</option>
                                    <option>garden</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridImage" >
                                <Form.Label>Image</Form.Label>
                                <Form.Control name="image" type="file" required                  />
                            </Form.Group>
                        </Form.Row>
                        {this.state.loading ?
                            <Button className="col-lg-12" variant="dark" disabled >
                                Please wait... <Spinner animation="border" />
                            </Button>
                            :
                            <Button className="col-lg-12" variant="dark" type="submit">Add product</Button>
                        }
                    </Form>
                </div>
            </>
        )
    }


export default AddProduct;