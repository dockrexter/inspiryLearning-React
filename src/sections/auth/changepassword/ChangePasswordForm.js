import * as Yup from 'yup';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSelector } from 'react-redux';
import axios from 'axios';
// material
import { Stack,TextField, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import LockIcon from '@mui/icons-material/Lock';
import Iconify from '../../../components/Iconify';
import { BackEndUrl } from "../../../url";
import { toast } from 'react-toastify';
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

          const res = await axios.post(`${BackEndUrl}/api/users/changePassword`,
            {
              oldPassword: values.oldpassword,
              newPassword: values.password,
            },
            { 
              headers: 
              { 
                token: user.token 
              } 
            }
          );
          if (res.data.status === "ok") {
            setInValid(false);
            toast.success("Password changed successfully");
            navigate("/", { replace: true });

          }
          else {
            setInValid(true);
          }

        }
        else {
          toast.error("Password and confirm password does not match");
        }

      }
      catch (error) {
        console.error("Something Went Wrong! Try again Password", error);
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
