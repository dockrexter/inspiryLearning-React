import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';

// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from "axios";

// component
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../../../redux/user';
import Iconify from '../../../components/Iconify';
import { BackEndUrl } from "../../../url";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [inValid, setInValid] = useState(false);


  const dispatch = useDispatch();

  const { user } = useSelector(
    state => state.user
  );
  console.log("loginFrom user", user);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {



      try {
        const res = await axios.post(`${BackEndUrl}/login`, {
          email: values.email,
          password: values.password,
          role: user.role

        });
        console.log("token recevied", res.data);
        if (res.data.status === "ok") {


          window.localStorage.setItem('token', JSON.stringify(res.data.user.token));
          window.localStorage.setItem('firstname', JSON.stringify(res.data.user.firstname));
          window.localStorage.setItem('lastname', JSON.stringify(res.data.user.lastname));
          window.localStorage.setItem('phone', JSON.stringify(res.data.user.phone));
          window.localStorage.setItem('email', JSON.stringify(res.data.user.email));
          window.localStorage.setItem('role', JSON.stringify(res.data.user.role));
          window.localStorage.setItem('user_id', JSON.stringify(res.data.user.user_id));
          dispatch(update(res.data.user));
          setInValid(false)
          {user.role === "admin" ? navigate("/auth/admin", { replace: true }) : navigate("/dashboard/app", { replace: true });}
          // navigate("/dashboard/app", { replace: true });
        }
        else {
          setInValid(true);
        }
      } catch (error) {
        setInValid(true);
        console.log(error);
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            placeholder="Enter Email Address"
            // label="Email Address"
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
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            // label="Password"
            placeholder="Enter Password"

            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
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
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="/forget" underline="hover">
            Forgot password?
          </Link>

        </Stack>
        {inValid ? <Alert severity="error" sx={{ marginBottom: 1 }}>Invalid Credentials</Alert>
          : null}

        <LoadingButton fullWidth size="large" type="submit" variant="contained" color="secondary" loading={isSubmitting}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider >
  );
}
