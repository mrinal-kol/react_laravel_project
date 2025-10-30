<?php

use Illuminate\Support\Facades\Route;

Route::get('/users', function () {
    return [
        ['id' => 1, 'name' => 'Mrinal'],
        ['id' => 2, 'name' => 'Rahul'],
        ['id' => 3, 'name' => 'Sita'],
    ];
});
?>