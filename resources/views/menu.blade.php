  <style>
        /* Layout */
        html, body {
            height: 100%;
            margin: 0;
            background-color: yellow;
        }

        body {
            display: flex;
            flex-direction: column;
            font-family: Arial, sans-serif;
            /* background: #f3f4f6; */
            background-color: yellow;
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
            /* display: flex; */
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
    
/* body{
    font-family: Arial, sans-serif;
    background:#f4f6f8;
    margin:0;
    padding:20px;
} */
.container{
    max-width:1100px;
    margin:auto;
    background:#fff;
    padding:20px;
}
h1,h3{
    margin-top:0;
}
.lead{
    color:#555;
}
table{
    width:100%;
    border-collapse:collapse;
    margin:10px 0 25px;
}
th,td{
    border:1px solid #ccc;
    padding:8px 10px;
    text-align:left;
}
th{
    background:#eee;
}
.section-head{
    display:flex;
    align-items:center;
    gap:8px;
    margin:20px 0 10px;
}
.badge{
    font-size:18px;
}
.mono{
    font-family: monospace;
}
.summary{
    background:#f1f1f1;
    padding:10px;
    margin-top:10px;
}
.cta{
    font-weight:bold;
    margin-top:15px;
}

    </style>
<header>
        <!-- <h1>{{ config('app.name') }}</h1> -->
        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/services">Services</a>
            <a href="/contact">Contact</a>
            <a href="/details">Details</a>
            <a href="{{route('payment')}}">Payment</a>
            <a href="{{route('phpmysql')}}">PHP MySql Question Answer</a>
            <a href="{{url('interview')}}">Interview Project</a>
            <a href="{{url('autoload')}}">Auto Load</a>
            <a href="{{url('doctopdf')}}">Doc to pdf</a>
            <a href="{{route('paymentDetails')}}">Payment History</a>
        </nav>
    </header>