import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {useSnackbar} from 'notistack'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function SignUp() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        login_id: '',
        password: '',
        confirm_password: '',
        contact_number: '',
        security_question: '',
        security_answer: '',
      });
      const [data, setData] = useState("");
  const [formUpdated, setFormUpdated] = useState(false);

  const handleInputChange = (event) => {
    setFormUpdated(false);
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const {enqueueSnackbar} = useSnackbar();
  
  function showNotification(message, variant="error"){
    return enqueueSnackbar(message, {variant});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let validData = true;
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          if (formData[key] === '' || formData[key] === null) {
           showNotification("Please fill the required fields - "+key);
           validData = false;
          }
        }
      }
    console.log('Form data submitted:', formData);
    if(validData){
        setFormUpdated(true);
    }
 
  };
  useEffect(() => {
    if(formUpdated){
    let config = {
      method: 'post',
      url: 'http://127.0.0.1:5000/api/v1.0/moviebooking/register',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }
    fetch('http://127.0.0.1:5000/api/v1.0/moviebooking/register', config)
      .then((response) => {return response.json()})
      .then((data) => {
        setData(data)
        console.log(data)
        if(data.message == "User registered successfully"){
            showNotification(data.message + ".Taking you to sign in page","success")
            setTimeout(function() {
              console.log("After 2000ms");
              window.location.href = '/';
            }, 1000);
        }
        else{
        showNotification(data.message, "error")
      }})
      .catch((error) => {
        console.error('Error fetching data:', error)
      });
  }

  }, [formUpdated]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="login_id"
                  label="LoginID"
                  value={formData.login_id}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contact_number"
                  label="Contact"
                  type="phone"
                  value={formData.contact_number}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl required fullWidth>
                  <InputLabel>Security Question</InputLabel>
                  <Select
                    name="security_question"
                    value={formData.security_question}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="What is your father's name">What is your father's name</MenuItem>
                    <MenuItem value="What is your favorite color">What is your favorite color</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="security_answer"
                  label="Answer"
                  value={formData.security_answer}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
