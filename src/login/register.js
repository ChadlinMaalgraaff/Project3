import React, { useState, Component } from "react";
import { Row, Col, Form, Button, FormGroup, FormControl} from "react-bootstrap";
import img from "../Images/facebook-logo.png"
import { Formik } from 'formik';
import * as Yup from 'yup';
import '../App.css';

function Register() {
    const schema = Yup.object().shape({
      username: Yup.string().required("This field is required"),
      firstname: Yup.string().required("This field is required"),
      lastname: Yup.string().required("This field is required"),
      email: Yup.string().email("Please enter a valid email address").required("This field is required"),
      password: Yup.string().required("This field is required").min(8, "Password is too short - should be at least 8 characters")
                            .matches(/(?=.*[0-9])/, "Password should contain at least one number")
                  
    });

    return (
      <Formik 
        validationSchema={schema}
        validateOnBlur={false}
        onSubmit={(values, {setSubmitting, resetForm, validate}) => {
          validate(values)
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 30000)
        }}
        initialValues={{
          firstname:"",
          lastname:"", 
          email: '',
          password:"", 
          username: ""}}
      >
        {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form className="form-wrapper" noValidate onSubmit={handleSubmit}>
        <div>
          <span> <img src={img} className="img"/> </span>
        </div>
        <Form.Group controlId="validationFormik01" className="firstName">
            <Row>
                <Col>
                    <Form.Label> First Name</Form.Label>
                    <Form.Control 
                    required
                    type="text"
                    placeholder="First name"
                    name="firstname"
                    value={values.firstname}
                    onChange={handleChange}
                    isValid={touched.firstname && !errors.firstname}
                    isInvalid={touched.firstname && !!errors.firstname} />
                    <Form.Control.Feedback type="invalid">
                        {errors.firstname}
                    </Form.Control.Feedback>
                </Col>
                <Col>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                    required
                    type="text"
                    placeholder="Last name"
                    name="lastname"
                    value={values.lastname}
                    onChange={handleChange}
                    isValid={touched.lastname && !errors.lastname}
                    isInvalid={touched.lastname && !!errors.lastname} />
                    <Form.Control.Feedback type="invalid">
                        {errors.lastname}
                    </Form.Control.Feedback>
                </Col>
            </Row>
        </Form.Group>
        <Form.Group controlId="validationFormik02" className="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            required
            type="email" 
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={handleChange}
            isInvalid={touched.email && !!errors.email}
            isValid ={touched.email && !errors.email} />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="validationFormikUsername" className="username">
          <Form.Label>Username</Form.Label>
          <Form.Control 
          required
          type="username" 
          placeholder="Username"
          name="username"
          value={values.username}
          onChange={handleChange}
          isInvalid={touched.username && !!errors.username}
          isValid ={touched.username && !errors.username} />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="validationFormik04" className="password" >
          <Form.Label>Password</Form.Label>
          <Form.Control
          required
          type="password" 
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          isInvalid={touched.password && !!errors.password}
          isValid ={touched.password && !errors.password} />
          <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
        </Form.Group>
        <Button variant="dark" type="submit">
          Register
        </Button>
        <div className="but">
          <Button variant="link"> Already have an account?</Button>
        </div>
        
      </Form>
      )}
    </Formik>
    );
}

export default Register;