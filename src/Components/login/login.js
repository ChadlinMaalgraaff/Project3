import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import React, { Component, useState } from 'react';
import { Row } from 'react-bootstrap';
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
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { TextField } from 'formik-material-ui';
import img from "../../Images/facebook-logo.png";
import axios from 'axios';
import auth from './AuthService';
import Cookie from "js-cookie";
import logo from '../../Images/twaddle_dark_blue_circle.png';
import './index.css';
import { createMuiTheme } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "black",
    backgroundColor: '#498ec5',
    '&:hover': {
      backgroundColor: '#b6d1de'
    }
  },
  image: {
    width: 'auto',
    height: 'auto'
  },
  button: {
    color: "#498ec5",
    backgroundColor: '#b6d1de',
    '&:hover': {
      backgroundColor: '#498ec5'
    }
  }
});      

class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeCheck = this.onChangeCheck.bind(this);
    this.state = {
      username: '',
      password: '',
      remember: false
    }
  };

  onChangeUserName(e) {
    this.setState({username: e})
  }
  onChangePassword(e) {
    this.setState({password: e})
  }
  
  onChangeCheck(e) {
    this.setState({remember: e.target.checked})
  }
  render() {
    const schema = Yup.object().shape({
      username: Yup.string().required("This field is required"),
      password: Yup.string().required("This field is required")
                  
    });

    
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
        <Formik 
        validationSchema={schema}
        validateOnBlur={false}
        validateOnChange={true}
        onSubmit={(values, { setSubmitting }) => {
            
            const data = {
              username: values.username,
              password: values.password
            };
            
            const options = {
              headers: {
                  'Content-Type': 'application/json',
              }
            };
            
            axios.post('http://3.209.12.36:8000/api/account/login', data, options)
             .then((res) => {
               console.log("RESPONSE ==== : ", res);
               console.log(res.data.response)
               if (res.data.response == "Successfully authenticated.") {
                auth.login(() => {
                  Cookie.set("token", res.data.token);
                  console.log(this.state.remember)
                  if (this.state.remember) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('id', res.data.pk);
                    this.props.history.push('/home');
                  } else {
                    console.log(Cookie.get("token"));
                    var date = new Date();
                    date.getDate();
                    var tomorrow = new Date();
                    tomorrow.setDate(date.getDate() + 1);
                    localStorage.setItem('date', date);
                    localStorage.setItem('tomorrow', tomorrow);
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('id', res.data.pk);
                    this.props.history.push('/home');
                  }
                  
                 })
               } else {
                 alert("Invalid Username or Password");
               }

             })
             .catch((err) => {
               console.log("ERROR: ====", err);
             })
          //setSubmitting(false);
          setTimeout(() => {
            setSubmitting(false);
            /*console.log(values);
            alert(JSON.stringify(values, null, 2));*/
          }, 500);
        }}
        initialValues={{ 
          username: '',
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
          <div style={{fontFamily: 'MyFont', fontSize: '70px', padding: '20px'}}>
            Twaddle
          </div>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Field
              component={TextField}
              color="black"
              variant="outlined"
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              onChange={handleChange}
              isInvalid={touched.username && !!errors.username}
              isValid ={touched.username && !errors.username}
              autoComplete="username"
              autoFocus
              style={{color: "#b6d1de"}}
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
              isInvalid={touched.password && !!errors.password}
              isValid ={touched.password && !errors.password}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value={this.state.remember} onChange={this.onChangeCheck} color="primary" />}
              label="Remember me"
            />
            {isSubmitting && <LinearProgress />}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color="#b6d1de">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2" color="#b6d1de">
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
}
      
export default withStyles(styles)(Login);
