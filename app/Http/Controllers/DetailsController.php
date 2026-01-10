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
        try {
            $validated = $request->validate([
                'name' => [
                    'required',
                    'string',
                    'max:50',
                    fn($attr, $value, $fail) => $this->noHtml($attr, $value, $fail),
                ],
                'email' => [
                    'required',
                    'email',
                    //'unique:contact_us,email,' . $id . ',id', // <-- use correct table
                    fn($attr, $value, $fail) => $this->noHtml($attr, $value, $fail),
                ],
                'message' => [
                    'nullable',
                    'string',
                    'max:500',
                    fn($attr, $value, $fail) => $this->noHtml($attr, $value, $fail),
                ],
            ]);

            $user = Contact::findOrFail($id);

            // ✅ Only update validated data
            $user->update($validated);

            return response()->json([
                'status' => true,
                'message' => 'User updated successfully',
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            // temporarily return exception message for debugging
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ], 500);
        }
    }


    public function updateOld(Request $request, $id)
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
    public function add_info(Request $request)
    {
        try {

            $validated = $request->validate([
                'name' => [
                    'required',
                    'string',
                    'max:50',
                    fn ($a, $v, $f) => $this->noHtml($a, $v, $f),
                ],
                'email' => [
                    'required',
                    'email',
                    fn ($a, $v, $f) => $this->noHtml($a, $v, $f),
                ],
                'service' => [
                    'required',
                    'string',
                    'max:50',
                    fn ($a, $v, $f) => $this->noHtml($a, $v, $f),
                ],
                'message' => [
                    'required',
                    'string',
                    'max:500',
                    fn ($a, $v, $f) => $this->noHtml($a, $v, $f),
                ],
            ]);

            Contact::create($validated);

            return response()->json([
                'status' => true,
                'message' => 'Your request has been submitted successfully!',
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {

            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {

            return response()->json([
                'status' => false,
                'message' => 'Something went wrong. Please try again later.',
            ], 500);
        }
    }

    private function noHtmlOld($attribute, $value, $fail)
    {
        if (preg_match('/<[^>]*>/', $value)) {
            $fail("HTML tags are not allowed in {$attribute}");
        }
    }

    private function noHtml($attribute, $value, $fail)
    {
        if ($value && preg_match('/<[^>]*>/', $value)) {
            $fail("HTML tags are not allowed in {$attribute}");
        }
    }
}