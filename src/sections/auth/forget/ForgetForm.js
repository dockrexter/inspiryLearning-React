import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import { BackEndUrl } from '../../../url';


// ----------------------------------------------------------------------

export default function ForgetForm() {
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async() => {
      try {
        const res = await axios.post(`${BackEndUrl}/api/users/sendPasswordResetLink`,
        {
            email: values.email,
        }
          );
          if (res) {
            alert("Password Reset Link sended to your Email!!")

        }
    } catch (error) {
        alert("Something Went Wrong!! Please Try Again")
        console.error("Error in Forget password: ", error);       
    } 
      navigate('/dashboard', { replace: true });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;



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

        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />


        <LoadingButton fullWidth size="large" type="submit" variant="contained" color="secondary" loading={isSubmitting}>
          Send
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
