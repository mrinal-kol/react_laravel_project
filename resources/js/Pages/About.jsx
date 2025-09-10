import { Link } from '@inertiajs/react';

export default function About() {
    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>About Page</h1>
            <nav>
                <Link href="/">Home</Link> | <Link href="/about">About</Link>
            </nav>
            <p>This is a fresh Laravel + React + Inertia example.</p>
        </div>
    );
}
