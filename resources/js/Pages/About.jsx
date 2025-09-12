import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
    );
    const data = await res.json();
    setItems(prev => [...prev, ...data]);
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      {items.map(item => (
        <p key={item.id}>{item.title}</p>
      ))}
    </InfiniteScroll>
  );
}
