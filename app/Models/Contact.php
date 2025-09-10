<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    // Specify the table name if it doesn't follow Laravel's naming convention
    protected $table = 'contact_us';

    // Mass assignable fields
    protected $fillable = [
        'name',
        'email',
        'message',
    ];
    
    // Optional: If your primary key is not 'id'
    // protected $primaryKey = 'contact_id';

    // Optional: If your table does not use timestamps
    // public $timestamps = false;
}
