import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>Home Page</h1>
            <nav>
                <Link href="/">Home</Link> | <Link href="/about">About</Link>
            </nav>

            <h2>Users List</h2>
            <ul>
                {users.map(u => <li key={u.id}>{u.name}</li>)}
            </ul>
        </div>
    );
}
