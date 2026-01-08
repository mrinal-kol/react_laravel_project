<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Contact;
use Illuminate\Http\Request;

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
    public function update(Request $request, $id)
    {
        $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|unique:users,email,' . $id,
            'message' => 'nullable|string|max:255',
        ]);

        $user = Contact::findOrFail($id);

        $user->update([
            'name'    => $request->name,
            'email'   => $request->email,
            'message' => $request->message,
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'User updated successfully',
        ]);
    }
}