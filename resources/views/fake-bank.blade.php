<!-- <form action="/bank/submit" method="POST">
    @csrf
    <input placeholder="Card Number" required>
    <button type="submit">Pay Now</button>
</form> -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Secure Bank Payment</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #eef2f3;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .bank-box {
            background: white;
            width: 400px;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 0 10px #ccc;
        }
        .bank-header {
            text-align: center;
            border-bottom: 1px solid #ddd;
            padding-bottom: 15px;
            margin-bottom: 20px;
        }
        .bank-header h2 {
            margin: 0;
            color: #0059b3;
        }
        .input-group {
            margin-bottom: 15px;
        }
        label {
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
        }
        input[type="text"], input[type="number"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #bbb;
            border-radius: 5px;
        }
        button {
            width: 100%;
            padding: 12px;
            background: #0059b3;
            color: white;
            font-size: 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
        }
        button:hover {
            background: #004a99;
        }
        .secure {
            text-align: center;
            color: #666;
            margin-top: 10px;
            font-size: 12px;
        }
    </style>
</head>
<body>

<div class="bank-box">
    <div class="bank-header">
        <h2>Secure Bank Payment</h2>
        <p>Processing Payment: ₹{{ $amount ?? 0 }}</p>
    </div>

    <form action="/bank/submit" method="POST">
        @csrf

        <input type="hidden" name="amount" value="{{ $amount }}">

        <div class="input-group">
            <label>Card Number</label>
            <input type="text" placeholder="xxxx xxxx xxxx xxxx" required>
        </div>

        <div class="input-group">
            <label>Card Holder Name</label>
            <input type="text" placeholder="John Doe" required>
        </div>

        <div class="input-group">
            <label>OTP</label>
            <input type="number" placeholder="Enter 6-digit OTP" required>
        </div>

        <button type="submit">Pay ₹{{ $amount }}</button>

        <p class="secure">🔒 100% Secure Transaction</p>
    </form>
</div>

</body>
</html>
