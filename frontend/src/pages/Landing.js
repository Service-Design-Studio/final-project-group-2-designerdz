import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Buttons.js";
import Customers from "../components/Customers.js";
import { API_URL } from "../utilities/constants.js";

function getAPIData() {
  return axios.get(API_URL).then((response) => response.data);
}

export default function Landing() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    let mounted = true;
    getAPIData()
      .then((items) => {
        if (mounted) {
          setCustomers(items);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => (mounted = false);
  }, []);

  console.log(customers);

  return (
    <div>
      <Button
        text="NOT A CUSTOMER YET?"
        bgcolor="bg-red-500"
        hovercolor="hover:bg-red-700"
        onClick={() => navigate("/details")}
      />
      <Button
        text="LOG IN"
        bgcolor="bg-slate-500"
        hovercolor="hover:bg-slate-700"
        onClick={() => alert("Sorry we are not DBS!")}
      />
      <Customers customers={customers} />
    </div>
  );
}
