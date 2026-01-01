<!DOCTYPE html>
<html>
<head>
    <title>Redirecting to PayU...</title>
</head>
<body onload="document.forms.payu.submit();">
    <h3>Redirecting to PayU payment page...</h3>
    <form name="payu" method="post" action="https://test.payu.in/_payment">
        <!-- @csrf -->
        <input type="hidden" name="key" value="{{ $key }}">
        <input type="hidden" name="txnid" value="{{ $params['txnid'] }}">
        <input type="hidden" name="amount" value="{{ $params['amount'] }}">
        <input type="hidden" name="productinfo" value="{{ $params['productinfo'] }}">
        <input type="hidden" name="firstname" value="{{ $params['firstname'] }}">
        <input type="hidden" name="email" value="{{ $params['email'] }}">
        <input type="hidden" name="phone" value="{{ $params['phone'] }}">
        <input type="hidden" name="surl" value="{{ route('payu.success') }}">
        <input type="hidden" name="furl" value="{{ route('payu.failure') }}">
        <input type="hidden" name="hash" value="{{ $hash }}">
        
        <noscript>
            <input type="submit" value="Click here if not redirected automatically">
        </noscript>
    </form>
</body>
</html>
