import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Link, Stack,TextField, IconButton, InputAdornment} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import LockIcon from '@mui/icons-material/Lock';
import Iconify from '../../../components/Iconify';
import axios from 'axios';
import { BackEndUrl } from 'src/url';

// ----------------------------------------------------------------------

export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [searchToken, setSearchToken] = useSearchParams();
  const token = searchToken.get("token");
  console.log("Token From Link",token);


  const ResetPassSchema = Yup.object().shape({
    newpassword: Yup.string().required('Password is required'),
    confirmpassword: Yup.string().required('Password is required'),

  });

  const formik = useFormik({
    initialValues: {
      newpassword: '',
      confirmpassword: '',
    },
    validationSchema: ResetPassSchema,
    onSubmit: async() => {
        try {
            const res = await axios.post(`${BackEndUrl}/api/users/resetPassword`,
            {
                password: values.confirmpassword,
                token: token
            }
              );
              if (res) {
                alert("Password Reset Successfully\n Please Login")
    
            }
        } catch (error) {
            alert("Something Went Wrong!! Please Try Again")
            console.error("Error in Reseting password: ", error);       
        } 
          navigate('/dashboard', { replace: true });
        },
      });

  const { errors, values, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };


  const handleShowPasswordConfirm = () => {
    setShowPasswordConfirm((show) => !show);
  };
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="new-password"
            type={showPassword ? 'text' : 'password'}
            // label="Password"
            placeholder="New Password"

            {...getFieldProps('newpassword')}
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
            error={Boolean(touched.newpassword && errors.newpassword)}
            helperText={touched.newpassword && errors.newpassword}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPasswordConfirm ? 'text' : 'password'}
            // label="Password"
            placeholder="Confirm Password"

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

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />



        <LoadingButton fullWidth size="large" type="submit" variant="contained" color="secondary" loading={isSubmitting}>
          Done
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}