
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
            height: 100%;
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
            flex: 1;          /* THIS makes the main area grow and push footer to bottom */
            padding: 30px;
            box-sizing: border-box;
        }

        /* Footer stays at bottom */
        footer {
            background: #2563eb;
            color: white;
            text-align: center;
            padding: 5px;
        }

        /* small helper to center form in demo */
        .pay-form {
            max-width: 600px;
            margin: 0 auto;
        }
        /* Center wrapper */
        .pay-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;          /* Use main flex:1 for full height */
        }

        /* Payment box */
        .pay-box {
            background: white;
            padding: 30px 40px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            text-align: center;
            width: 300px;
        }

        /* Title */
        .pay-box h3 {
            margin-bottom: 20px;
            font-size: 20px;
        }

        /* Amount input */
        .amount-input {
            width: 100%;
            padding: 12px;
            font-size: 18px;
            text-align: center;
            border: 2px solid #2563eb;
            border-radius: 6px;
            margin-bottom: 20px;
            background: #eef3ff;
        }

        /* Payment button */
        .pay-btn {
            width: 100%;
            padding: 12px;
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
        }

        .pay-btn:hover {
            background: #1e4fc1;
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
        <main>
            <div class="pay-wrapper">
                <div class="pay-box">
                    <h3>Amount</h3>

                    <form action="/pay/process" method="POST">
                        @csrf

                        <input type="text" value="200" name="amount" class="amount-input" readonly>

                        <button class="pay-btn" type="submit">Make Payment</button>
                    </form>
                </div>
            </div>
        </main>

    <footer>
        <p>&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
    </footer>

</body>
</html>

