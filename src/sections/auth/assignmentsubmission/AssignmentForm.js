import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import axios from "axios";
import { useSelector } from 'react-redux';

// material
import { Link, Stack, Checkbox, TextField, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// component
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { BackEndUrl } from "../../../url";

// ----------------------------------------------------------------------

export default function AssignmentForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [date, setDate] = useState(new Date());
  const { user } = useSelector(state => state.user);



  const getUploadParams = () => {
    return { url: 'https://httpbin.org/post' }
  }

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta)
  }

  const handleSubmitDrop = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  // const LoginSchema = Yup.object().shape({
  //   firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
  //   lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
  //   phone: Yup.string().required('Phone is required'),

  // });

  const formik = useFormik({
    initialValues: {
      subject: '',
      summary: '',
      attachments: [],
      startdate: '',
      enddate: ''
    },
    onSubmit: async (values) => {
      try {

        const res = await axios.post(`${BackEndUrl}/assignment/postAssignments`,
          {
            values: {
              subject: values.subject,
              summary: values.summary,
              attachments: values.attachments,
              deadline: date,
              user_id: user.user_id,
              status: "Work in Progress"
            }

          },


          {
            headers: {
              token: user.token
            }
          });
        console.log("assignments", res.data);
        navigate('/dashboard/user', { replace: true });

      }
      catch (error) {
        console.log(error);
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
  console.log("values", values)
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>

            <Stack spacing={2} direction="column">
              <TextField
                fullWidth
                size="small"
                placeholder="Subject"
                {...getFieldProps('subject')}
                multiline
              // error={Boolean(touched.firstName && errors.firstName)}
              // helperText={touched.firstName && errors.firstName}

              />
              <TextField
                fullWidth
                size="small"
                multiline
                rows={6}
                placeholder="Summary"

                {...getFieldProps('summary')}
              // error={Boolean(touched.lastName && errors.lastName)}
              // helperText={touched.lastName && errors.lastName}

              />

            </Stack>
          </Grid>

          <Grid item xs={6}>

            <Stack direction="column" spacing={1}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
              >
                <DateTimePicker
                  label="Due Date"
                  size="small"
                  value={date}

                  onChange={(newValue) => {
                    setDate(newValue);
                  }}

                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      sx={{ width: "fit-content" }}


                    />
                  )}
                />
              </LocalizationProvider>

              <Typography variant='h6' sx={{ color: "#202323" }}>
                Attachments
              </Typography>
              <Dropzone
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmitDrop}
                styles={{ dropzone: { maxHeight: 250 } }}
              />
            </Stack>
          </Grid>

        </Grid>

        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ marginTop: 2, width: "100%" }} >



          <LoadingButton disabled={!(values.subject && values.summary && date)} size="large" type="submit" variant="contained" color="secondary" loading={isSubmitting} sx={{ width: 400 }}>
            Submit & Proceed        </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
