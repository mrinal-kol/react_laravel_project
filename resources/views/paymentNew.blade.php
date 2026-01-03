<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ config('app.name') }} | Payment</title>

    @viteReactRefresh
    @vite('resources/js/app.jsx')

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        /* Layout */
        html, body {
            height: 100%;
            margin: 0;
        }

        body {
            display: flex;
            flex-direction: column;
            font-family: Arial, sans-serif;
            background: #f3f4f6;
        }

        /* Header */
        header {
            background: #2563eb;
            padding: 15px 30px;
        }

        nav a {
            color: #fff;
            margin-right: 16px;
            text-decoration: none;
            font-weight: 500;
        }

        nav a:hover {
            text-decoration: underline;
        }

        /* Main */
        main {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 30px;
        }

        /* Payment Card */
        .pay-box {
            background: #ffffff;
            width: 420px;
            padding: 40px 45px;
            border-radius: 16px;
            box-shadow: 0 20px 45px rgba(0,0,0,0.08);
            text-align: center;
        }

        .pay-title {
            font-size: 22px;
            font-weight: 600;
            color: #111827;
            margin-bottom: 6px;
        }

        .pay-subtitle {
            font-size: 15px;
            color: #6b7280;
            margin-bottom: 30px;
        }

        /* Amount */
        .field-group {
            margin-bottom: 30px;
        }

        .amount-label {
            display: block;
            font-size: 14px;
            color: #374151;
            margin-bottom: 8px;
        }

        .amount-input {
            width: 93%;
            padding: 14px;
            font-size: 22px;
            text-align: center;
            border-radius: 10px;
            border: 2px solid black;
            background: red;
            color: aliceblue;
            font-weight: 600;
        }

        /* Button */
        .pay-btn {
            width: 100%;
            padding: 14px;
            background: #2563eb;
            color: #fff;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .pay-btn:hover {
            background: #1e40af;
            box-shadow: 0 10px 25px rgba(37, 99, 235, 0.35);
            transform: translateY(-1px);
        }

        /* Secure text */
        .secure-text {
            margin-top: 22px;
            font-size: 13px;
            color: #6b7280;
        }

        /* Footer */
        footer {
            background: #2563eb;
            color: #fff;
            text-align: center;
            padding: 8px;
            font-size: 13px;
        }
    </style>
</head>

<body>

<!-- Header -->
<header>
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/services">Services</a>
        <a href="/contact">Contact</a>
        <a href="/details">Details</a>
        <a href="{{ route('payment') }}">Payment</a>
    </nav>
</header>

<!-- Main -->
<main style='background-color: yellow;'>
    <div class="pay-box">

        <div class="pay-title">Payment Details</div>
        <div class="pay-subtitle">Secure payment powered by PayU</div>

        <form action="/pay/process" method="POST">
            @csrf

            <div class="field-group">
                <label class="amount-label">Amount (INR)</label>
                <input type="text" name="amount" value="200" class="amount-input" readonly>
            </div>

            <button type="submit" class="pay-btn">
                Pay ₹200
            </button>
        </form>

        <div class="secure-text">
            🔒 100% Secure Payment
        </div>

    </div>
</main>

<!-- Footer -->
<footer>
    &copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.
</footer>

</body>
</html>
