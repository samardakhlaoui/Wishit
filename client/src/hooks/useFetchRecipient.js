import { useEffect, useState } from "react";
import { getRequest, baseUrl } from "../utils/services";
import axios from "axios";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState({});
  const [error, setError] = useState(null);

  const recipientId = chat?.members.find((id) => id !== user?._id);
 

  useEffect(() => {
       const getUserRecipient = async () => {
        if (!recipientId) 
          return null;
        
        const response = await getRequest(`${baseUrl}/users/${recipientId}`);
        

        if (response.error) {
          return setError(response);
        }
        setRecipientUser(response);
      };
      
      getUserRecipient();
    
  },[recipientId]);


  return {recipientUser};
};
