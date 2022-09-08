import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  CircularProgress,
} from '@mui/material';
// utils
// components
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import { onMessageListener} from '../../firebase';
import { useEffect } from 'react';
import axios from 'axios';
import { BackEndUrl } from 'src/url';
import { useDispatch, useSelector } from 'react-redux';
import EmailIcon from '@mui/icons-material/Email';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useNavigate } from 'react-router-dom';
import { update } from 'src/redux/assignments';
import moment from 'moment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { toast } from 'react-toastify';
// ----------------------------------------------------------------------
//notificationReaded

export default function NotificationsPopover() {
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(state => state.user);

  const anchorRef = useRef(null);

  const [dbNotificatons, setdbnotifications] = useState("");
  const [totalUnRead, setTotalUnRead] = useState(0);

  const [open, setOpen] = useState(null);

  const getTotalunread = async()=>{
    try {
      const res = await axios.get(`${BackEndUrl}/api/users/getAllNotifications`, {
        headers:{
          token: user?.token
        }
      })
      if(res.status === 200){
        console.log("Notifications=>", res)
        setTotalUnRead(res?.data?.data?.filter((item) => item.isRead === false).length)
      }
    } catch (error) {
      console.error(error)
      
    }
  }
  useEffect(()=>{
    getTotalunread();
  },[])

  const ReadAllNotifications = async()=>{
    try {
      const res = await axios.post(`${BackEndUrl}/api/users/notificationReaded`,{
        userId: user?.id 
      }, {
        headers:{
          token: user?.token
        }
      })
      if(res){
        //console.log("Notification Read: ", res);
      }
    } catch (error) {
      console.error(error)
      
    }
  }
  onMessageListener().then(payload => {
    // console.log("ON MASSAGE BG: ", payload)
    // setdbnotifications([...dbNotificatons, {id: payload.messageId, title: payload?.data?.title, message: payload?.data?.body, avatar: null, createdAt: new Date(), isRead: false,assignmentID: payload?.data?.assignmentID}]);
    setTotalUnRead(totalUnRead + 1);
    toast.info(`${payload?.data?.title} \n ${payload?.data?.body}`);
  }).catch(err => console.error('failed: ', err));


  const handleOpen = async(event) => {
    setLoading(true);
    setOpen(event.currentTarget);
      try {
        const res = await axios.get(`${BackEndUrl}/api/users/getAllNotifications`, {
          headers:{
            token: user?.token
          }
        })
        if(res){
          setdbnotifications(res?.data?.data)
          setTotalUnRead(res?.data?.data?.filter((item) => item.isRead === false).length)
          setLoading(false);
        }
      } catch (error) {
        console.error(error)
        
      }
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    ReadAllNotifications();
    setTotalUnRead(0)
    setdbnotifications(
      dbNotificatons?.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" width={30} height={30} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread Notifications
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={()=>handleMarkAllAsRead()}>
                <Iconify icon="eva:done-all-fill" width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {loading? <Box sx={{diplay: "flex"}}>
              <CircularProgress/>
            </Box>  :
            dbNotificatons?.length > 0 ? 
            dbNotificatons?.filter(opt => opt.isRead === false)?.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} totalRead={setTotalUnRead} unRead={totalUnRead}/>
            )):
            <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">Notifications</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  No Notification
                </Typography>
              </Box>
            </Box>}
          </List>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Seen
              </ListSubheader>
            }
          > {loading? 
              <Box sx={{diplay: "flex"}}>
                <CircularProgress/>
              </Box>  :
                dbNotificatons?.length > 0 ?
                dbNotificatons?.filter(opt => opt.isRead === true)?.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                )):<Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1">Notifications</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      No Notification
                    </Typography>
                  </Box>
                </Box>}
          </List>
        </Scrollbar>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Box sx={{ p: 1 }}>
          <Button fullWidth>
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.string,
    id: PropTypes.number,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification , totalRead, unRead}) {
  const { user } = useSelector(state => state.user);
   const { avatar, title } = renderContent(notification);
   const dispatch = useDispatch();
    const navigate = useNavigate();
    const readSingleNotification = async(id)=>{
      try {
        const res = await axios.post(`${BackEndUrl}/api/users/singleNotificationReaded`,{
          id: id 
        }, {
          headers:{
            token: user?.token
          }
        })
        if(res){
          //console.log("Notification Single Read: ", res);
          totalRead(unRead -1);
        }
      } catch (error) {
        console.error(error)
        
      }
    }

   const handleClickNotifi = (id, msgId,data)=>{
     // console.log("id",id,"CHECK NOTI DETAILS: ",msgId);
      if(data?.isRead === false){
        readSingleNotification(msgId);
      }
      window.localStorage.setItem('insp_LEARN_assignId', JSON.stringify(id));
      dispatch(update({id}));
      navigate('/dashboard/assigmentdetails');
      window.location.reload();
  }

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(!notification.isRead && {
          bgcolor: 'action.selected',
        }),
      }}
      onClick={()=>{handleClickNotifi(notification?.assignmentID, notification?.id,
        notification)}}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {moment(notification?.createdAt).fromNow()}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {notification?.message}
      </Typography>
    </Typography>
  );

  if (notification?.title === 'New Assignment') {
    return {
      avatar: <AssignmentIcon sx={{color:"#0FA958"}}/>,
      title,
    };
  }
  if (notification?.title === 'New Message') {
    return {
      avatar: <EmailIcon sx={{color:"#0FA958"}}/>,
      title,
    };
  }
  if (notification?.title === "Assignment Status") {
    return {
      avatar: <AutorenewIcon sx={{color:"#0FA958"}}/>,
      title,
    };
  }
  if (notification?.title === 'Payment Update') {
    return {
      avatar: <MonetizationOnIcon sx={{color:"#0FA958"}}/>,
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
}
