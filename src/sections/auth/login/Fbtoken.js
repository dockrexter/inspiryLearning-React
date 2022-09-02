import axios from "axios";
import { BackEndUrl } from "src/url";


export const addToken = async(tokenDB, currentToken) => {
    try {
      const res = await axios.post(`${BackEndUrl}/api/token/add`, {
        token: currentToken,
      },
      {
        headers: {
              token: tokenDB,
        }
      }
      );
    } catch (error) {
      console.error('error adding Token: ', error);
      
    }
  }