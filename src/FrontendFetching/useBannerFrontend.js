import axios from "axios";
import { useEffect, useState } from "react";

const useBannerFrontend = () => {
    
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBanner = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URL}/api/banner/public`
        );
        if (res.data.success) {
          setBanner(res.data.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  return { banner, loading };
}

export default useBannerFrontend