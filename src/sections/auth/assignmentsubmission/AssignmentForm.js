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
  const [fileList, setFileList] = useState([]);



  const getUploadParams = () => {
    return { url: `${BackEndUrl}/api/upload` }
  }

  const handleChangeStatus = ({ meta }, status) => {
    {status === 'rejected_file_type' ? alert("This File Type is not Allowed"): null}
  }

  const handleSubmitDrop = (files, allFiles) => {
    for(let i = 0; i < files.length; i++){
      console.log(files[i].file);
      setFileList([...fileList, files[i].file]);
    }
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
        const formData = new FormData();
        if(fileList.length > 0){
          for(var i=0; i<fileList.length; i++){
          formData.append( 
              "file", 
              fileList[i], 
              fileList[i].name 
            );
          }
        }

        const res = await axios.post(`${BackEndUrl}/api/assignments/createUserAssignment`,
          { 
            files: formData, 
            subject: values.subject,
            summary: values.summary,
            deadline: values.deadline,
          },
          {
            headers: {
              token: user.token
            }
          });
        console.log("assignments", res.data);
        alert("Assignment Created Successfully!!")
        //navigate('/dashboard/user', { replace: true });

      }
      catch (error) {
        console.error("Error Adding Assignment: ", error);
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;



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
              />
              <TextField
                fullWidth
                size="small"
                multiline
                rows={6}
                placeholder="Summary"
                {...getFieldProps('summary')}
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
                // getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmitDrop}
                styles={{ dropzone: { maxHeight: 250 } }}
                accept="image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, text/plain, application/x-zip-compressed, application/vnd.openxmlformats-officedocument.wordprocessingml.template, application/vnd.ms-powerpoint.template, application/vnd.openxmlformats-officedocument.spreadsheetml.template, application/vnd.ms-excel.template, application/vnd.openxmlformats-officedocument.presentationml.template"
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
