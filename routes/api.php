<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DetailsController;
Route::get('/users', function () {
    return [
        ['id' => 1, 'name' => 'Mrinal'],
        ['id' => 2, 'name' => 'Rahul'],
        ['id' => 3, 'name' => 'Sita'],
    ];
});
Route::post('/doc-to-pdf', [DetailsController::class, 'convert']);
?>