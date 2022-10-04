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
import { toast } from 'react-toastify';

// ----------------------------------------------------------------------

export default function AssignmentForm() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const { user } = useSelector(state => state.user);
  const [fileList, setFileList] = useState([]);



  const handleChangeStatus = ({ meta }, status, fileWithMeta) => {
    if(status === 'rejected_file_type'){
    toast.error("This File Type is not Allowed")
  }else if(status === 'error_file_size'){
    toast.error("File Size too large")
  }else{
      setFileList(fileWithMeta)}
  }

  // const handleSubmitDrop = (allFiles) => {
    
  //   setFileList(allFiles);
  //   allFiles.forEach(f => f.remove())
  // }


  const formik = useFormik({
    initialValues: {
      subject: '',
      summary: '',
      attachments: [],
      startdate: '',
      enddate: ''
    },
    onSubmit: async (values) => {
        const formData = new FormData();
        console.log("FileList=>",fileList);
        if(fileList.length > 0){
          for(var i=0; i<fileList.length; i++){
          formData.append( 
              "files", 
              fileList[i].file, 
              fileList[i].file.name 
            );
          }
        }
        formData.append("subject", values.subject);
        formData.append("summary", values.summary);
        formData.append("deadline", date);
      try {
        const res = await axios.post(`${BackEndUrl}/api/assignments/createUserAssignment`,
        formData,
          {
            headers: {
              token: user.token
            }
          });
          if(res){
        toast.success("Assignment Created Successfully!!")
        setFileList([]);
        navigate('/dashboard/user', { replace: true });
          }

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
                  minDate={new Date()}
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
                styles={{ dropzone: { maxHeight: 250 } }}
                accept="image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, text/plain, application/x-zip-compressed, application/vnd.openxmlformats-officedocument.wordprocessingml.template, application/vnd.ms-powerpoint.template, application/vnd.openxmlformats-officedocument.spreadsheetml.template, application/vnd.ms-excel.template, application/vnd.openxmlformats-officedocument.presentationml.template"
                maxSizeBytes={10485760}
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
