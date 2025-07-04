import { useState, useEffect } from "react";
import axios from "axios";

/**
 * PUBLIC_INTERFACE
 * useGeolocation - Custom React hook to fetch user's geolocation data using ipinfo.io.
 * Returns { city, ip, country, region, loading, error }.
 * Handles network failures and returns error string if fetch fails.
 */
export function useGeolocation() {
  const [geo, setGeo] = useState({
    city: "",
    ip: "",
    country: "",
    region: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let canceled = false;
    setLoading(true);
    setError("");
    // IPinfo returns JSON: { city, country, region, ip, ... }
    axios
      .get("https://ipinfo.io/json?token=") // Token not required for basic quota
      .then((res) => {
        if (!canceled && res.data) {
          setGeo({
            city: res.data.city || "",
            ip: res.data.ip || "",
            country: res.data.country || "",
            region: res.data.region || "",
          });
        }
      })
      .catch((err) => {
        if (!canceled) {
          setError("Unable to retrieve location");
        }
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });
    return () => {
      canceled = true;
    };
  }, []);

  return { ...geo, loading, error };
}

export default useGeolocation;
