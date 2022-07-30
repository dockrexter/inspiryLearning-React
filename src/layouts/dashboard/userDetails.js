import axios from 'axios';

const getUserDetails = async () => {
    try {

      const res = await axios.get(`${BackEndUrl}/user/details?user_id=${user.user_id}`, {
        headers: {
          token: user.token
        }
      });
      //console.log("assignments", res.data);
      if (res.data.status === "ok") {
        setAssignments(res.data.assignments);
        setLoading(false);
      }
    }
    catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getAssignments();
  }, []);