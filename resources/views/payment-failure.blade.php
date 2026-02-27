
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ config('app.name') }}</title>

    @viteReactRefresh
    @vite('resources/js/app.jsx')

    <style>
    
     
        

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

    @include('menu')
        <main>
            <div class="pay-wrapper">
                <div class="pay-box">
                    <h2>Payment Failed, try after sometime !</h2>
                    <p>Transaction ID: {{ $data['txnid'] }}</p>
                    <p>Amount: ₹{{ $data['amount'] }}</p>
                    <p>Status: {{ $data['status'] }}</p>



                </div>
            </div>
        </main>

    <footer>
        <p>&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
    </footer>

</body>
</html>

