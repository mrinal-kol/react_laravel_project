<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpWord\IOFactory;
use Barryvdh\DomPDF\Facade\Pdf;


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
    public  function getPracties()
    {
        //$users = Contact::select('id', 'name', 'email','created_at','message')->orderBy('id','desc')->get();
        $users = DB::table('student_details')->get();
        //print_r($user->toArray());
        return response()->json($users);
    }
    public function convert(Request $request)
    {
        try {

            // validate file
            $request->validate([
                'file' => 'required|file|mimes:doc,docx|max:10000'
            ]);

            if (!$request->hasFile('file')) {
                return response()->json([
                    'error' => 'No file uploaded'
                ], 400);
            }

            $file = $request->file('file');

            // load doc file
            $phpWord = IOFactory::load($file->getPathname());

            // convert to HTML
            $htmlWriter = IOFactory::createWriter($phpWord, 'HTML');

            ob_start();
            $htmlWriter->save("php://output");
            $html = ob_get_clean();

            // convert HTML → PDF
            $pdf = Pdf::loadHTML($html);

            return $pdf->download('file.pdf');

        } catch (\Exception $e) {

            return response()->json([
                'error' => $e->getMessage(),
                'line' => $e->getLine()
            ], 500);
        }
    }
    
    public  function getPractiesPro()
    {
        
        $limit = $request->limit ?? 10;
        $offset = $request->offset ?? 0;
        $users = DB::table('student_details')
                    ->offset($offset)
                    ->limit($limit)
                    ->get();

        return response()->json($users);
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

    public function showpage()
    {
        $amt = 200;
        return view('mysql_interview_question',compact('amt'));
        
        //return view('paymentNew',compact('amt'));
    }
}