<?php

namespace App\Contracts;

interface PaymentGatewayInterface
{
    public function startPayment(array $data);
    public function bankPage(array $data);
    public function verify(array $data);
}
