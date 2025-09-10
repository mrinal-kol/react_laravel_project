<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/blade-about', function () {
    $users = ['Mrinal', 'Rahul', 'Sita'];
    return view('blade-about', ['users' => $users]);
});

Route::get('/', function () {
    return Inertia::render('Home'); // Home.jsx
});

Route::get('/about', function () {
    return Inertia::render('About'); // About.jsx
});
Route::get('/react-about', function () {
    $users = ['Mrinal', 'Rahul', 'Sita'];
    return Inertia::render('ReactAbout', [
        'users' => $users
    ]);
});

Route::get('/react-contact', function () {
    return Inertia::render('ReactContact');
});

Route::get('/blade-contact', function () {
    return view('blade-contact');
});

Route::get('/contact', function () {
    return Inertia::render('Contact'); // Contact.jsx
});

use App\Models\Contact;

Route::post('/contact-submit', function (Request $request) {
    $validated = $request->validate([
        'name' => 'required|string|max:50',
        'email' => 'required|email',
        'message' => 'required|string|max:500',
    ]);

    try {
        Contact::create($validated);

        return redirect('/contact')->with('success', 'Form submitted successfully!');
    } catch (\Exception $e) {
        Log::error('DB error while saving contact: ' . $e->getMessage());

        // Instead of crashing, return an error bag
        return back()->withErrors([
            'form' => 'Something went wrong while saving your message. Please try again later.',
        ]);
    }
});

Route::post('/services-submit', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:50',
        'email' => 'required|email',
        'service' => 'required|string|max:50',
        'message' => 'required|string|max:500',
    ]);

    // Example: save to database or send email
    // \App\Models\ServiceRequest::create($request->all());

    return redirect('/services')->with('success', 'Your request has been submitted successfully!');
});

Route::get('/services', function () {
    return Inertia::render('Services');
});
