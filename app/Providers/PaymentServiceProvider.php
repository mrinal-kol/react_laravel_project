<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Contracts\PaymentGatewayInterface;
use App\Services\DemoPaymentService;

class PaymentServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(
            PaymentGatewayInterface::class,
            DemoPaymentService::class
        );
    }

    public function boot() {}
}
