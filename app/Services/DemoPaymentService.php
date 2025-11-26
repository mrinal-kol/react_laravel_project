<?php

namespace App\Services;

use App\Contracts\PaymentGatewayInterface;

class DemoPaymentService implements PaymentGatewayInterface
{
    public function startPayment(array $data)
    {
        return view('fake-bank', [
            'amount' => $data['amount']
        ]);
    }

    public function bankPage(array $data)
    {
        return redirect('/payment-success')
            ->with('status', 'Demo Payment Completed');
    }

    public function verify(array $data)
    {
        return true; // demo only
    }
}
