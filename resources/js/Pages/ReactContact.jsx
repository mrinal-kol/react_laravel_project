import { Link } from '@inertiajs/react';

export default function ReactContact() {
    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>React + Inertia Contact Page</h1>
            <Link href="/react-about">Go Back to About</Link>
        </div>
    );
}
