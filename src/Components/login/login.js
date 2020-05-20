import React, { useState, Component } from "react";
import {Container, Row, Col, Form, Button, FormGroup, FormControl} from "react-bootstrap";
import img from "../../Images/facebook-logo.png"
import { Formik } from 'formik';
import * as Yup from 'yup';
import '../../App.css';

function Login() {
    const schema = Yup.object().shape({
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
          email: '',
          password:"", 
          }}
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
          Login
        </Button>
        <div className="but">
          <Button variant="link"> Don't have an account? Register</Button>
        </div>
        
      </Form>
      )}
    </Formik>
    );
}

export default Login;