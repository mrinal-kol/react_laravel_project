import { Link } from '@inertiajs/react';

export default function ReactAbout({ users }) {
    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>React + Inertia About Page</h1>
            <h2>Users List:</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user}</li>
                ))}
            </ul>
            <Link href="/react-contact">Go to Contact (React)</Link>
        </div>
    );
}
