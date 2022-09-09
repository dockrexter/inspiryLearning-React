import { useFormik, Form, FormikProvider } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import axios from "axios";
// material
import { Stack, TextField, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { BackEndUrl } from '../../../url';
import { update } from '../../../redux/user';
import { toast } from 'react-toastify';

// ----------------------------------------------------------------------

export default function SettingsForm() {
  const dispatch = useDispatch();
  const { user } = useSelector(
    state => state.user
  );
  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    },
    onSubmit: async (values) => {

      try {

        const res = await axios.post(`${BackEndUrl}/api/users/updateUser`,
        {
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
        },
          {
            headers: {
              token: user.token
            }
          }
        )
        if (res) {
            window.localStorage.setItem('insp_LEARN_firstName', JSON.stringify(values?.firstName));
            window.localStorage.setItem('insp_LEARN_lastName', JSON.stringify(values?.lastName));
            window.localStorage.setItem('insp_LEARN_phone', JSON.stringify(values?.phone));
            dispatch(update({firstName:values?.firstName,lastName:values?.lastName, phone:values?.phone,id: user?.id, token:user?.token,email: user?.email, role:user?.role}));
            toast.success("Settings Update Successfully!!", {autoClose:500})
        }

      }
      catch (error) {
        console.error("Setting Update Failed: ", error);
        toast.error("Something Went Wrong! Please Try Again");
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
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <PersonIcon />

              </InputAdornment>,
            }}
          />
          <TextField
            fullWidth
            placeholder="Phone Number"
            {...getFieldProps('phone')}
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
