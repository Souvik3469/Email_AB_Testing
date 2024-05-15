import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const AuthAPI = () => {
  if (typeof window !== "undefined") {
    return axios.create({
      baseURL: `http://localhost:5000/v1`,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  } else {
    return axios.create({
      baseURL: `http://localhost:5000/v1`,
      headers: {
        authorization: `Bearer`,
        "Content-Type": "application/json",
      },
    });
  }
};
const createVariant = async (ExperimentId,VariantInfo) => {
  const { data } = await AuthAPI().post(`/user/create-variant/?experimentId=${ExperimentId}`, VariantInfo);
  return data;
};


const getMyVariant = async (ExperimentId) => {
 
  const { data } = await AuthAPI().get(`/user/get-allvariant/?experimentId=${ExperimentId}`);
 
  return data;
};
const getMyVariantQuery = (ExperimentId) =>
  useQuery({
    queryKey: ["get-my-Variant"],
    queryFn: () => getMyVariant(ExperimentId),
    select: (data) => {
      const res = data;
      console.log("V2",res);
      return res;
    },
  });

 

export { createVariant, getMyVariantQuery};
