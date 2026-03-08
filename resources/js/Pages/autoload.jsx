import React, { useState, useEffect } from "react";
import axios from "axios";



export default function Details() {
  const [lastId, setLastId] = useState(null); 
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 40;
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // stop loading
  
    // ⭐ important
  

  const fetchData = async () => {

  if (loading || !hasMore) return;

  setLoading(true);

  const res = await axios.get(`/autoloadPage?limit=${limit}&last_id=${lastId ?? ''}`);

  if (res.data.length === 0) {
    setHasMore(false);
  } else {

    setData(prev => [...prev, ...res.data]);

    // store last record id
    const lastRecord = res.data[res.data.length - 1];
    setLastId(lastRecord.id);
  }

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
  }, [offset, loading, hasMore]);

  return (
  <div>
    <h1>Students</h1>

    <table border="1" width="100%">
      <thead>
        <tr>
          <th>Sl</th>
          <th>Name</th>
          <th>Email</th>
          <th>ID</th>
        </tr>
      </thead>

      <tbody>
        {data.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.id}</td>
          </tr>
        ))}
      </tbody>
    </table>

    {loading && <p>Loading...</p>}
  </div>
);
}