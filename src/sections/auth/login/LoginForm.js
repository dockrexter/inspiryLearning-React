import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { updateToken } from '../../../redux/fbToken';

// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel, Alert, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from "axios";
import { fetchToken} from './FCMtoken';
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
  //....................................................//
  //...................................................//
  //...................................................//

  const { user } = useSelector(
    state => state.user
  );
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid').required('Email is required'),
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
        const res = await axios.post(`${BackEndUrl}/api/users/login`, {
          email: values.email,
          password: values.password,
          role: user.role
        });
        if (res.data.status === "ok") {
          window.localStorage.setItem('insp_LEARN_token', JSON.stringify(res?.data?.data?.token));
          window.localStorage.setItem('insp_LEARN_firstName', JSON.stringify(res?.data?.data?.firstName));
          window.localStorage.setItem('insp_LEARN_lastName', JSON.stringify(res?.data?.data?.lastName));
          window.localStorage.setItem('insp_LEARN_phone', JSON.stringify(res?.data?.data?.phone));
          window.localStorage.setItem('insp_LEARN_email', JSON.stringify(res?.data?.data?.email));
          window.localStorage.setItem('insp_LEARN_role', JSON.stringify(res?.data?.data?.role));
          window.localStorage.setItem('insp_LEARN_id', JSON.stringify(res?.data?.data?.id));
          await fetchToken(res.data.data.token);
          dispatch(update(res.data.data));
          dispatch(updateToken({fbTokenClient: JSON.parse(window.localStorage.getItem("insp_LEARN_fbtoken"))}));
          setInValid(false)
          {user.role === "admin" ? navigate("/dashboard/admin", { replace: true }) : navigate("/dashboard/user", { replace: true });}
          
        }
        else {
          setInValid(true);
        }
      } catch (error) {
        setInValid(true);
        console.error(error);
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
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                BY
              </Typography>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" color="secondary" loading={isSubmitting}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
