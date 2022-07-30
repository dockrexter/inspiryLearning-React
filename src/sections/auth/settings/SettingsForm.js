import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import axios from "axios";
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { BackEndUrl } from '../../../url';
import { update } from '../../../redux/user';

// ----------------------------------------------------------------------

export default function SettingsForm() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user } = useSelector(
    state => state.user
  );
  const formik = useFormik({
    initialValues: {
      firstName: user.firstname,
      lastName: user.lastname,
      phone: user.phone,
    },
    onSubmit: async (values) => {

      try {

        const res = await axios.post(`${BackEndUrl}/user/updateUser`, {
          values: {
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            user_id: user.user_id
          }
        },
          {
            headers: {
              token: user.token
            }
          }
        )
        if (res.data.status === "ok") {
          window.localStorage.setItem('firstname', JSON.stringify(res.data.firstName));
          window.localStorage.setItem('lastname', JSON.stringify(res.data.lastName));
          window.localStorage.setItem('phone', JSON.stringify(res.data.phone));
          // dispatch(update(res.data.user));

        }

      }
      catch (err) {
        console.log(err);
      }


    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;


  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            placeholder="First Name"
            {...getFieldProps('firstName')}
            // error={Boolean(touched.firstName && errors.firstName)}
            // helperText={touched.firstName && errors.firstName}
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <PersonIcon />

              </InputAdornment>,
            }}
          />
          <TextField
            fullWidth
            placeholder="Last Name"

            {...getFieldProps('lastName')}
            // error={Boolean(touched.lastName && errors.lastName)}
            // helperText={touched.lastName && errors.lastName}
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <PersonIcon />

              </InputAdornment>,
            }}
          />
          <TextField
            fullWidth
            // autoComplete="email"
            type="number"

            // label="Email address"
            placeholder="Phone Number"
            {...getFieldProps('phone')}
            // error={Boolean(touched.phone && errors.phone)}
            // helperText={touched.phone && errors.phone}
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <LocalPhoneIcon />

              </InputAdornment>,
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1 }} />



        <LoadingButton fullWidth size="large" type="submit" variant="contained" color="secondary" loading={isSubmitting}>
          Save
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
