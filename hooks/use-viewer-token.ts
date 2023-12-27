import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");
  useEffect(()=>{
    const createToken = async ()=>{
        try {
            const viewerToken = await createViewerToken();
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
  },[]);
};
