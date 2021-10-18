import axios from "axios";
import { useState, useEffect } from "react";

export default function UseFetchApi(url) {
  const [apiResult, setapiResult] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const fetchAPI = () => {
    axios
      .get(url)
      .then((result) => {
        setapiResult(result.data);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAPI();
  }, [url]);

  return { apiResult, isLoading };
}
