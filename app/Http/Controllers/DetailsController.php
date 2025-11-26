<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Contact;

class DetailsController extends Controller
{
    public function index()
    {
        $users = Contact::select('id', 'name', 'email')->orderBy('id','desc')->get();
        //echo "<pre>";
        //print_r($users->toArray());
        return Inertia::render('Details', [
            'users' => $users
        ]);
    }
    public function payment()
    {
        echo "payment";
    }
}