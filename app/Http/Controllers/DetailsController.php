<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Contact;

class DetailsController extends Controller
{
    public function index()
    {
        $users = Contact::select('id', 'name', 'email','created_at','message')->orderBy('id','desc')->get();
        //echo "<pre>";
        //print_r($users->toArray());
        // return Inertia::render('Details', [
        //     'users' => $users
        // ]);
        //DetailsNew.jsx
        return Inertia::render('DetailsNew', [
            'users' => $users
        ]);
    }
    public function payment()
    {
        $amt = 200;
        return view('paymentNew',compact('amt'));
    }
    public function show($id)
    {
        return response()->json(
            Contact::findOrFail($id)
        );
    }
}