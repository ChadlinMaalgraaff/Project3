import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import React, { Component, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Button, LinearProgress } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
//import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { TextField } from 'formik-material-ui';
import img from "../../Images/facebook-logo.png";

function Login() {
      const [email, password] = useState("");
      
      const schema = Yup.object().shape({
        email: Yup.string().email("Please enter a valid email address").required("This field is required"),
        password: Yup.string().required("This field is required").min(8, "Password is too short - should be at least 8 characters")
                              .matches(/(?=.*[0-9])/, "Password should contain at least one number")
                    
      });

      const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
          width: theme.spacing(10),
          height: theme.spacing(10),
        },
        form: {
          width: '100%',
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
        image: {
          width: 'auto',
          height: 'auto'
        }
      }));      
      const classes = useStyles();
      return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
          <Formik 
          validationSchema={schema}
          validateOnBlur={false}
          validateOnChange={true}
          onSubmit={(values, { setSubmitting }) => {
            //validate(values)
            setTimeout(() => {
              setSubmitting(false);
              alert(JSON.stringify(values, null, 2));
            }, 500);
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
          submitForm,
          isSubmitting,
          errors,
        }) => (
          <div className={classes.paper}>
            <Avatar className={classes.avatar} >
            <img src="https://www.gravatar.com/avatar/2b3dedd1282b8980095c5c5ca3d1a1a7"/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleChange}
                isInvalid={touched.email && !!errors.email}
                isValid ={touched.email && !errors.email}
                autoComplete="email"
                autoFocus
              />
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
                isInvalid={touched.email && !!errors.email}
                isValid ={touched.email && !errors.email}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {isSubmitting && <LinearProgress />}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        )}
      </Formik>
      </Container> 
      );
    }
    
export default Login;

/*import React, { useState, Component } from "react";
import { Row, Col, Form, Button, FormGroup, FormControl} from "react-bootstrap";
import img from "../../Images/facebook-logo.png";
import { Formik } from 'formik';
import * as Yup from 'yup';
import '../../App.css';
import { CssBaseline, Container } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useRouteMatch, Redirect } from 'react-router-dom';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    }
  }
    render() {
      const schema = Yup.object().shape({
        email: Yup.string().email("Please enter a valid email address").required("This field is required"),
        password: Yup.string().required("This field is required").min(8, "Password is too short - should be at least 8 characters")
                              .matches(/(?=.*[0-9])/, "Password should contain at least one number")
                    
      });
      
      return (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="xs" fluid>
          <Formik 
          validationSchema={schema}
          validateOnBlur={false}
          onSubmit={(values, {setSubmitting,isSubmitting, resetForm, validate}) => {
            //validate(values)
            console.log("logged in");
            if (isSubmitting) {
              console.log("logged in");
              this.props.push('/home');
            }
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
    
}*/