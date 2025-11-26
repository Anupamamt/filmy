import React from 'react';
import { Box, Button, TextField, Typography, Paper, Avatar, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  signIn,
} from '../api/api'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values) => {
    try {
      const data = await signIn(values);
      
      const { refresh, access } = data?.data;
      localStorage.setItem('token', access); // store token
      localStorage.setItem('refresh', refresh);
      navigate('/Home');
    } catch (error) {
      console.log(error)
      const message = error.response?.data?.detail || 'Login failed';
      localStorage.clear();

      alert(message)
    } finally {
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#eeeeee',
        width: '100vw',
        position: 'relative',
      }}
    >
      {/* ChatApp Label */}
      <Typography
        variant="h4"
        sx={{
          position: 'absolute',
          top: 45,
          left: 70,
          color: '#19305e',
          fontWeight: 'bold',
        }}
      >
        Filmy
      </Typography>

      <Paper elevation={3} sx={{ padding: 4, width: 360 }}>
        <Box textAlign="center" mb={2}>
          <Avatar sx={{ bgcolor: '#19305e', margin: '0 auto' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" color="#19305e" mt={1}>
            Log In
          </Typography>
        </Box>

        {/* Formik Form */}
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Field
                name="username"
                as={TextField}
                label="Username"
                placeholder="admin"  
                fullWidth
                margin="normal"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.username && errors.username}
                error={touched.username && Boolean(errors.username)}
              />
              <Field
                name="password"
                as={TextField}
                label="Password"
                placeholder="admin123"  
                fullWidth
                margin="normal"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.password && errors.password}
                error={touched.password && Boolean(errors.password)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: '#19305e',
                  '&:hover': {
                    backgroundColor: '#16294f',
                  },
                }}
              >
                Log In
              </Button>
            </Form>
          )}
        </Formik>

      </Paper>
    </Box>
  );
};

export default Login;
