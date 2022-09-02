import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Assignments from 'src/sections/assignments/Assignments';


export default function AdminAssignments() {
const [assignments, setAssignments] = useState([]);
const [loading, setLoading] = useState(true);
const { user } = useSelector(state => state.user);

const getAllAssignments = async() => {
        try {
          const res = await axios.get(`${BackEndUrl}/assignment/getAllAssignmentsAdmin`, {
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
          console.error("",error);
        }
      }
      useEffect(() => {
        getAllAssignments();
      }, []);
  return (
    <Assignments data={assignments} />
  )
}