import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import React, { Component, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Button, LinearProgress } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { TextField } from 'formik-material-ui';
import { createMuiTheme } from '@material-ui/core/styles';
import img from "../../Images/iu-2.jpeg";
import axios from 'axios';
import auth from './AuthService';
import Cookie from 'js-cookie';
import logo from '../../Images/twaddle_dark_blue_circle.png';
import CryptoJS from 'crypto-js';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#498ec5',
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
    padding: '20px', 
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});    

class Register extends Component {
  constructor(props) {
    super(props);
  }
      render() {
        const initialValues = {
          firstname:"",
          lastname:"", 
          email: '',
          password:"", 
          username: "",
          confirm: ""
      };
      const { classes } = this.props;
    
      const schema = Yup.object().shape({
        username: Yup.string().required("This field is required"),
        firstname: Yup.string().required("This field is required"),
        lastname: Yup.string().required("This field is required"),
        email: Yup.string().email("Please enter a valid email address").required("This field is required"),
        password: Yup.string().required("This field is required").min(8, "Password is too short - should be at least 8 characters")
                              .matches(/(?=.*[0-9])/, "Password should contain at least one number"),
        confirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords are not the same!')
                      .required("This field is required")        
      });
  
    return (
      <div className={classes.background}>
         <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Formik 
        validationSchema={schema}
        validateOnBlur={false}
        onSubmit={(values, { setSubmitting }) => {
  
          const data = {
            username: values.username,
            email: values.email,
            password: values.password,
            password2: values.confirm
          };
          
          const options = {
            headers: {
                'Content-Type': 'application/json',
            }
          };
          
          axios.post('http://3.209.12.36:8000/api/account/register', data, options)
           .then((res) => {
             console.log("RESPONSE ==== : ", res);
             console.log(res.data.response)
             
             if (res.data.response == "successfully registered new user.") {
              auth.login(() => {
                //Cookie.set("token", res.data.token);
                /*var cryptoemail = require('crypto');
                cryptoemail.createHash('md5').update(res.data.email).digest("hex");
                localStorage.setItem('email', cryptoemail);
                console.log(res.data.email);
                console.log(Cookie.get("token"));*/
                var hash = CryptoJS.MD5(values.email).toString();
                console.log(hash)
                localStorage.setItem('email', hash);
                localStorage.setItem('token', res.data.token);
               })
               const data = {
                 username: values.username,
                 email: values.email,
                 first_name: values.firstname,
                 last_name: values.lastname,
                 birthday: '2000-01-01',
                 gender: 'N',
                 avatar: 'null',
                 bio: 'null',
                 city: 'null'
               }
               const options = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + res.data.token
                }
                
              };
               axios.put('http://3.209.12.36:8000/api/account/properties/update', data, options) 
               .then((res) => {
                console.log("updated")
               })
               .catch((error) => {
                console.log("ERROR: ====", error);
                console.log("could not update details")
               })
             } else {
               alert("Username/email already exists");
             }
             this.props.history.push('/home');
           })
           .catch((err) => {
             console.log("ERROR: ====", err);
           })
          setTimeout(() => {
            setSubmitting(false);
            //alert(JSON.stringify(values, null, 2));
          }, 500);
       }}
        initialValues={initialValues}
      >
        {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isSubmitting,
        submitForm,
        isValid,
        errors,
      }) => (
        <div className={classes.paper}>
          <div style={{fontFamily: 'MyFont', fontSize: '70px', padding: '20px'}}>
            Twaddle
          </div>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  autoComplete="firstname"
                  name="firstname"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  onChange={handleChange}
                  isInvalid={touched.firstname && !!errors.firstname}
                  isValid ={touched.firstname && !errors.firstname}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="lastname"
                  onChange={handleChange}
                  isInvalid={touched.lastname && !!errors.lastname}
                  isValid ={touched.lastname && !errors.lastname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  autoComplete="username"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  onChange={handleChange}
                  isInvalid={touched.username && !!errors.username}
                  isValid ={touched.username && !errors.username}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  isInvalid={touched.email && !!errors.email}
                  isValid ={touched.email && !errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  variant="outlined"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  isInvalid={touched.password && !!errors.password}
                  isValid ={touched.password && !errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  variant="outlined"
                  required
                  fullWidth
                  name="confirm"
                  label="Confirm Password"
                  type="password"
                  id="confirm"
                  autoComplete="current-password"
                  onChange={handleChange}
                  isInvalid={touched.confirm && !!errors.confirm}
                  isValid ={touched.confirm && !errors.confirm}
                />
              </Grid>
            </Grid>
            {isSubmitting && <LinearProgress />}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            <Grid container justify="flex-middle">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
          )}
        </Formik>
      </Container>
      </div>
    );
      }
}

export default withStyles(styles)(Register);