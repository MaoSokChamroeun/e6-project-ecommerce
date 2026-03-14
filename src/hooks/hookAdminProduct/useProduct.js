import axios from "axios";
import { useEffect, useState } from "react";

const useProduct = () => {
    const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    try {
      setLoading(true);

      const token = sessionStorage.getItem("token");

      const res = await axios.get("http://localhost:4000/api/product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (error) {
      console.log("Fetch product failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
    return {products, loading , getProducts}
}

export default useProduct