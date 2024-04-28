import { useState, useEffect } from "react";
import axios from "axios";
const useApi = (url, param) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${url}?center_latitude=${param?.currentPosition?.lat}&center_longitude=${param?.currentPosition?.lng}&zoom_level=${param.zoomLevel}`
        );
        setData(response.data);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, param]);

  return { data, isLoading, isError };
};

export default useApi;
