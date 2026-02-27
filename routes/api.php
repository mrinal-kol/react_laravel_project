<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DetailsController;
use App\Http\Controllers\DemoPaymentController;
Route::get('/users', function () {
    return [
        ['id' => 1, 'name' => 'Mrinal'],
        ['id' => 2, 'name' => 'Rahul'],
        ['id' => 3, 'name' => 'Sita'],
    ];
});
Route::post('/doc-to-pdf', [DetailsController::class, 'convert']);
Route::post('/payu/success', [DemoPaymentController::class,'successPage'])->name('api/payu.success');

Route::post('/payu/failure', [DemoPaymentController::class, 'failurePage'])->name('api/payu.failure');
?>