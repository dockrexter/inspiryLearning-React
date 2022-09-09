import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { updateToken } from '../../../redux/fbToken';

// material
import { Stack, TextField, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import axios from "axios";
import { BackEndUrl } from "../../../url";
// component 
import Iconify from '../../../components/Iconify';
import { fetchToken } from '../login/FCMtoken';
import { update } from '../../../redux/user';
import { toast } from 'react-toastify';

// ----------------------------------------------------------------------


export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [inValid, setInValid] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Confirm Password is required'),

  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      if (values.password === values.confirmPassword) {
        try {
         // Api CAll for registration 
          const res = await axios.post(`${BackEndUrl}/api/users/register`, {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            role: "admin",
            phone: `${values.phone}`,
            password: values.password,
          });
          if (res) {
            window.localStorage.setItem('insp_LEARN_token', JSON.stringify(res?.data?.data?.token));
            window.localStorage.setItem('insp_LEARN_firstName', JSON.stringify(res?.data?.data?.firstName));
            window.localStorage.setItem('insp_LEARN_lastName', JSON.stringify(res?.data?.data?.lastName));
            window.localStorage.setItem('insp_LEARN_phone', JSON.stringify(res?.data?.data?.phone));
            window.localStorage.setItem('insp_LEARN_email', JSON.stringify(res?.data?.data?.email));
            window.localStorage.setItem('insp_LEARN_role', JSON.stringify(res?.data?.data?.role));
            window.localStorage.setItem('insp_LEARN_id', JSON.stringify(res?.data?.data?.id));
            await fetchToken(res?.data?.data?.token)
            dispatch(update(res?.data?.data));
            dispatch(updateToken({fbTokenClient: JSON.parse(window.localStorage.getItem("insp_LEARN_fbtoken"))}));
            setInValid(false)
            navigate("/dashboard/user", { replace: true });
          }
          else {
            setInValid(true);
          }
        } catch (error) {
          setInValid(true);
          console.error("Error in Registration",error);
        }
      }
      else {
      toast.warn("Password and Confirm Password must be same");
      }

    },
  });



  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              size="small"
              fullWidth
              placeholder="First Name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <PersonIcon />

                </InputAdornment>,
              }}
            />

            <TextField
              fullWidth
              placeholder="Last Name"
              size="small"

              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <PersonIcon />

                </InputAdornment>,
              }}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            size="small"

            // label="Email address"
            placeholder="Enter Email Address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <EmailIcon />

              </InputAdornment>,
            }}
          />


          <TextField
            fullWidth
            // autoComplete="email"
            type="text"
            size="small"

            // label="Email address"
            placeholder="Phone Number"
            {...getFieldProps('phone')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <LocalPhoneIcon />

              </InputAdornment>,
            }}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            size="small"

            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: <InputAdornment position="start">
                <LockIcon />

              </InputAdornment>,
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <TextField
            fullWidth
            size="small"

            autoComplete="current-password"
            type={showPasswordConfirm ? 'text' : 'password'}
            placeholder="Confirm Password"
            {...getFieldProps('confirmPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPasswordConfirm((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: <InputAdornment position="start">
                <LockIcon />

              </InputAdornment>,
            }}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />

          {inValid ? <Alert severity="error">User with this email already exist please choose a unique email address</Alert>
            : null}
          <LoadingButton fullWidth size="large" type="submit" variant="contained" color="secondary" loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
