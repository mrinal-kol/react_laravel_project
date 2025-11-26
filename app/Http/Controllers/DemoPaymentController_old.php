<?php

namespace App\Http\Controllers;

use App\Contracts\PaymentGatewayInterface;
use Illuminate\Http\Request;

class DemoPaymentController extends Controller
{
    protected $payment;

    public function __construct(PaymentGatewayInterface $payment)
    {
        $this->payment = $payment;
    }

    // Step 1: Show Pay Page
    public function payPage()
    {
        return view('pay', ['amount' => 200]);
    }

    // Step 2: Send to Fake Bank UI (via Service)
    public function processPayment(Request $request)
    {
        return $this->payment->startPayment($request->all());
    }

    // Step 3: Fake Bank Submit
    public function bankSubmit(Request $request)
    {
        return $this->payment->bankPage($request->all());
    }

    // Step 4: Success Page
    public function successPage()
    {
        return view('payment-success');
    }
}
