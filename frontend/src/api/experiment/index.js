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


const createExperiment = async (ExperimentInfo) => {
  const { data } = await AuthAPI().post("/user/create-exp", ExperimentInfo);
  return data;
};


const updateExperiment = async (ExperimentId, ExperimentInfo) => {
  const { data } = await AuthAPI().patch(`/user/update-exp?experimentId=${ExperimentId}`, ExperimentInfo);
  return data;
};


const deleteExperiment = async (ExperimentId) => {
  const { data } = await AuthAPI().delete(`/user/delete-exp?experimentId=${ExperimentId}`);
  return data;
};




const getMyExperiment = async () => {
  const { data } = await AuthAPI().get("/user/get-exp");
  return data;
};




const getMyExperimentsQuery = () =>
  useQuery({
    queryKey: ["get-my-Experiments"],
    queryFn: () => getMyExperiment(),
    select: (data) => {
      const res = data.message;
      console.log("Exp",res);
      return res;
    },
  });

 

export { createExperiment, updateExperiment, deleteExperiment ,getMyExperimentsQuery};
