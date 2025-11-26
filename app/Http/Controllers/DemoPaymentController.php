<?php

namespace App\Http\Controllers;

use App\Contracts\PaymentGatewayInterface;
use Illuminate\Http\Request;

class DemoPaymentController extends Controller
{
    protected $payment;

    // PayU credentials (sandbox)
    private $key = 'g8TMHL';
    private $salt = 'bTDHxCyvgtDmdydI6MZRBB7ZBf26dMnh';
    private $payuUrl = 'https://test.payu.in/_payment';

    public function __construct(PaymentGatewayInterface $payment)
    {
        $this->payment = $payment;
    }

    // Step 1: Show Pay Page
    public function payPage()
    {
        return view('pay', ['amount' => 200]);
    }

    // Step 2: Process Payment → render PayU auto-submit form
    public function processPayment(Request $request)
    {
        $params = [
            'txnid' => 'TXN'.time(),
            'amount' => $request->amount,
            'productinfo' => 'Demo Product',
            'firstname' => 'John',
            'email' => 'john@example.com',
            'phone' => '9999999999',
            'udf1' => '',
            'udf2' => '',
            'udf3' => '',
            'udf4' => '',
            'udf5' => ''
        ];

        $hash = $this->generateHash($params);

        return view('payu-form', [
            'params' => $params,
            'hash' => $hash,
            'key' => $this->key,
            'payuUrl' => $this->payuUrl
        ]);
    }

    // Step 3: Success Page (callback from PayU)
    public function successPage(Request $request)
    {
        \Log::info("PayU SUCCESS HIT", $request->all());

        return response()->json([
            'status' => 'SUCCESS RECEIVED',
            'data' => $request->all()
        ]);
        //$data = $request->all();
        // echo "<pre>";
        // print_r($request->all());
        // echo "</pre>";
        // exit;
        //return view('payment-success', ['data' => $data]);
    }

    // Step 4: Failure Page (callback from PayU)
    public function failurePage(Request $request)
    {
        $data = $request->all();
        return view('payment-failure', ['data' => $data]);
    }

    // Hash generator
    private function generateHash($params)
    {
        $hashString = $this->key.'|'.$params['txnid'].'|'.$params['amount'].'|'.$params['productinfo'].'|'.
                      $params['firstname'].'|'.$params['email'].'|'.$params['udf1'].'|'.$params['udf2'].'|'.
                      $params['udf3'].'|'.$params['udf4'].'|'.$params['udf5'].'||||||'.$this->salt;

        return strtolower(hash('sha512', $hashString));
    }
}
