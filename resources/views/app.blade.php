<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ config('app.name') }}</title>

    @viteReactRefresh
    @vite('resources/js/app.jsx')

    <style>
        /* Keep full height for body + sticky footer */
        html, body {
            /* height: 100%; */
            margin: 0;
        }

        /* Make body flex so footer stays bottom */
        body {
            display: flex;
            flex-direction: column;
            font-family: Arial, sans-serif;
            background: #f9fafb;
        }

        /* Header */
        header {
            background: #2563eb;
            color: white;
            padding: 15px 30px;
        }

        /* Your commented code kept */
        /* <h1>{{ config('app.name') }}</h1> */

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

        /* Main should auto expand to fill the page */
        main {
            flex: 1;
            padding: 30px;

            /* Keep your previous min-height line commented */
            /* min-height: 70vh; */
        }

        /* Footer stays at bottom */
        footer {
            background: #2563eb;
            color: white;
            text-align: center;
            padding: 5px;
        }
        .app-bg {
    min-height: 100vh;
    background:#FFFF00;
}

.btn-primary {
  padding: 6px 14px;
  background-color: #0d6efd;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-cancel {
  padding: 6px 14px;
  background-color: orangered;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary:hover {
  background-color: #0b5ed7;
}

.btn-primary:disabled {
  background-color: #9ec5fe;
  cursor: not-allowed;
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
    <main class="app-bg">
        @inertia
    </main>

    <!-- Footer -->
    <footer>
        <p>&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
    </footer>

</body>
</html>
