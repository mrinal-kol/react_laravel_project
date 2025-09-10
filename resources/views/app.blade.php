<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ config('app.name') }}</title>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #f9fafb;
        }
        header {
            background: #2563eb;
            color: white;
            padding: 15px 30px;
        }
        header h1 {
            margin: 0;
            font-size: 20px;
        }
        nav a {
            color: white;
            margin-right: 15px;
            text-decoration: none;
            font-weight: 500;
        }
        nav a:hover {
            text-decoration: underline;
        }
        main {
            min-height: 70vh;
            padding: 30px;
        }
        footer {
            background: #2563eb;
            color: white;
            text-align: center;
            padding: 15px;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <!-- <h1>{{ config('app.name') }}</h1> -->
        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/services">Services</a>
            <a href="/contact">Contact</a>
        </nav>
    </header>

    <!-- Body (React pages will load here) -->
    <main>
        @inertia
    </main>

    <!-- Footer -->
    <footer>
        <p>&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
    </footer>
</body>
</html>
