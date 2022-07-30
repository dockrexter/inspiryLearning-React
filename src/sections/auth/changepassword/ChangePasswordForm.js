import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSelector } from 'react-redux';
import axios from 'axios';
// material
import { Stack, Checkbox, TextField, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Iconify from '../../../components/Iconify';
import { BackEndUrl } from "../../../url";
// ----------------------------------------------------------------------

export default function ChangePasswordForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [Invalid, setInValid] = useState(false);

  const { user } = useSelector(
    state => state.user
  );

  const LoginSchema = Yup.object().shape({
    oldpassword: Yup.string().required('Password is required'),
    password: Yup.string().required('Password is required'),
    confirmpassword: Yup.string().required('Password is required'),

  });

  const formik = useFormik({
    initialValues: {
      oldpassword: '',
      password: '',
      confirmpassword: '',

    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {

        if (values.password === values.confirmpassword) {

          const res = await axios.post(`${BackEndUrl}/user/changePassword`, {
            values: {
              currentPassword: values.oldpassword,
              changePassword: values.password,
              confirmPassword: values.confirmpassword,
              user_id: user.user_id
            }
          },
            { headers: { token: user.token } }
          );
          console.log("token recevied", res.data);
          if (res.data.status === "ok") {
            setInValid(false);

            alert("Password changed successfully");

          }
          else {
            setInValid(true);
          }

        }
        else {
          alert("Password and confirm password does not match");
        }

      }
      catch (err) {
        console.log(err);
      }

    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };


  const handleShowPasswordConfirm = () => {
    setShowPasswordConfirm((show) => !show);
  };
  const handleShowPasswordOld = () => {
    setShowPasswordOld((show) => !show);
  };
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPasswordOld ? 'text' : 'password'}
            // label="Password"
            placeholder="Enter current password"

            {...getFieldProps('oldpassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPasswordOld} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: <InputAdornment position="start">
                <LockIcon />

              </InputAdornment>,
            }}
            error={Boolean(touched.oldpassword && errors.oldpassword)}
            helperText={touched.oldpassword && errors.oldpassword}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            // label="Password"
            placeholder="Enter new password"

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

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPasswordConfirm ? 'text' : 'password'}
            // label="Password"
            placeholder="Confirm new password"

            {...getFieldProps('confirmpassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPasswordConfirm} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: <InputAdornment position="start">
                <LockIcon />

              </InputAdornment>,
            }}
            error={Boolean(touched.confirmpassword && errors.confirmpassword)}
            helperText={touched.confirmpassword && errors.confirmpassword}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1 }} />

        {Invalid ? <Alert severity="warning">Password do not match</Alert> : null}


        <LoadingButton fullWidth size="large" type="submit" variant="contained" color="secondary" loading={isSubmitting}>
          Done
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
