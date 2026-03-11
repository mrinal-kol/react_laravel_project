<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ config('app.name') }} | Payment</title>

    @viteReactRefresh
    @vite('resources/js/app.jsx')

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    
</head>

<body>

<!-- Header -->
@include('menu');

<!-- Main -->
<main style='background-color: yellow;display: flex;'>
    <div class="pay-box">

        <div class="pay-title">Payment Details</div>
        <div class="pay-subtitle">Secure payment powered by PayU</div>

        <form action="/pay/process" method="POST">
            @csrf

            <div class="field-group">
                <label class="amount-label">Amount (INR)</label>
                <input type="text" name="amount" value="200" class="amount-input" >
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
