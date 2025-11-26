

<!DOCTYPE html>
<html>
<head>
    <title>Demo Bank Payment</title>
</head>
<body>
    <h2>Bank Payment Page</h2>
    <p>Amount: ₹{{ $params['amount'] }}</p>
    <form action="/bank/submit" method="POST">
        @csrf
        <input type="hidden" name="txnid" value="{{ $params['txnid'] }}">
        <input type="hidden" name="amount" value="{{ $params['amount'] }}">
        <label>Card Number</label>
        <input type="text" placeholder="xxxx xxxx xxxx xxxx" required><br><br>
        <label>Card Holder</label>
        <input type="text" placeholder="John Doe" required><br><br>
        <label>OTP</label>
        <input type="number" placeholder="Enter 6-digit OTP" required><br><br>
        <button type="submit">Pay ₹{{ $params['amount'] }}</button>
    </form>
</body>
</html>

