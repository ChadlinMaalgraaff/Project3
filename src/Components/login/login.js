import React, { useState, Component } from "react";
import { Row, Col, Form, Button, FormGroup, FormControl} from "react-bootstrap";
import img from "../../Images/facebook-logo.png"
import { Formik } from 'formik';
import * as Yup from 'yup';
import '../../App.css';
import { CssBaseline, Container } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useRouteMatch, Redirect } from 'react-router-dom';

function Login() {
    const schema = Yup.object().shape({
      email: Yup.string().email("Please enter a valid email address").required("This field is required"),
      password: Yup.string().required("This field is required").min(8, "Password is too short - should be at least 8 characters")
                            .matches(/(?=.*[0-9])/, "Password should contain at least one number")
                  
    });

    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="xs" fixed>
        <Formik 
        validationSchema={schema}
        validateOnBlur={false}
        onSubmit={(values, {setSubmitting, resetForm, validate}) => {
          validate(values)
          console.log("logged in");
          return <Redirect to="/"/>
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
        
          <Link to="/register">
          <div className="but">
            <Button variant="link" on>Don't have an account? Register</Button>
            </div>
          </Link>
        
      </Form>
      )}
    </Formik>
    </Container>
    </React.Fragment>
    );
}

export default Login;