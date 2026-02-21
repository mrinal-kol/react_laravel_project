import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Details() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [loading, setLoading] = useState(false);

  // fetch data
  const fetchData = async () => {
    if (loading) return;

    setLoading(true);

    const res = await axios.get(
      `/autoloadPage?limit=${limit}&offset=${offset}`
    );

    setData(prev => [...prev, ...res.data]);
    setOffset(prev => prev + limit);

    setLoading(false);
  };

  // first load
  useEffect(() => {
    fetchData();
  }, []);

  // scroll detect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset, loading]);

  return (
    <div>
      <h1>Students</h1>

      {data.map(user => (
        <div key={user.id}>
          {user.name} — {user.email}
        </div>
      ))}

      {loading && <p>Loading...</p>}
    </div>
  );
}