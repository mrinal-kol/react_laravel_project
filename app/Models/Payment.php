<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $table = 'payment_orders';   // database table name

    protected $primaryKey = 'id';   // primary key

    public $timestamps = true;      // created_at & updated_at

    protected $fillable = [
        'order_id',
        'amount',
        'status',
        'created_at',
        'updated_at',
        'bank_response'
    ];
}