import { getToken } from "firebase/messaging";
import  {messaging}  from "../../../firebase";
import { addToken } from "./Fbtoken";

export const fetchToken = async(tokenDB) => {
    return await getToken(messaging, {vapidKey: 'BC61EFfyLfPoF8RFu_9AyYXmuENK-HpHcagRPMGsiljTbHnjjIaB4hNGxd_Y3eXF5MX83mV70hBdw-L1t9aQUW4'}).then((currentToken) => {
      if (currentToken) {
       // console.log('current token for client: ', currentToken);
        window.localStorage.setItem('fbToken', JSON.stringify(currentToken));
        addToken(tokenDB, currentToken);
      } else {
       // console.log('No registration token available. Request permission to generate one.');
        alert("Permission Denied! App Behaviour unstable") 
      }
    }).catch((err) => {
      console.error('An error occurred while retrieving token. ', err);
    });
  }