<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ config('app.name') }}</title>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
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
            <a href="/details">Details</a>
            <a href="{{route('payment')}}">Payment</a>
        </nav>
    </header>

    <!-- Body (React pages will load here) -->
    <form action="/pay/process" method="POST" style='height:100px;margin-top:400px;padding-left:100px;'>
        @csrf
            <input type="hidden" name="amount" value="200">
            <button class='btn btn-primary' type="submit">Pay ₹200</button>
        </form>

    <!-- Footer -->
    <footer>
        <p>&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
    </footer>
</body>
</html>
