<?php
use App\Http\Controllers\DetailsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\DemoPaymentController;
use App\Models\Contact;

Route::middleware('indiaonly')->group(function () {

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
Route::get('makePayment',[DetailsController::class,'payment'])->name('payment');
Route::post('/pay/process', [DemoPaymentController::class, 'processPayment']);
Route::post('/bank/submit', [DemoPaymentController::class, 'bankSubmit']);
Route::get('/payment-success', [DemoPaymentController::class, 'successPage']);

//Route::post('payu/success', [DemoPaymentController::class, 'successPage'])->name('payu.success');

Route::match(['get', 'post'], 'payu/success', [
    DemoPaymentController::class,
    'successPage'
])->name('payu.success');
Route::post('payu/failure', [DemoPaymentController::class, 'failurePage'])->name('payu.failure');
// Route::get('/details', function () {
//     return Inertia::render('details'); // details.jsx
// });

Route::get('/details', [DetailsController::class, 'index']);

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
Route::post('/services-submit', [DetailsController::class, 'add_info']);
//Route::get('interview',['HelloController::class','interview'])->name('interview');
Route::get('interview',function(){
    //return view('prepration');
    //return Inertia::render('homeInt');
    return Inertia::render('homeInt');
});

Route::get('interviewTask',function(){
   
  $data = [
        // Department of Applied Mechanics (AM)
        ["category" => "Publication Dept", "code" => "AM", "org_unit_name" => "Department of Applied Mechanics", "org_unit_type" => "Department", "metric" => "publications", "year" => 2015, "value" => 52],
        ["category" => "Publication Dept", "code" => "AM", "org_unit_name" => "Department of Applied Mechanics", "org_unit_type" => "Department", "metric" => "publications", "year" => 2016, "value" => 59],
        ["category" => "Publication Dept", "code" => "AM", "org_unit_name" => "Department of Applied Mechanics", "org_unit_type" => "Department", "metric" => "publications", "year" => 2017, "value" => 91],
        ["category" => "Publication Dept", "code" => "AM", "org_unit_name" => "Department of Applied Mechanics", "org_unit_type" => "Department", "metric" => "publications", "year" => 2018, "value" => 71],
        ["category" => "Publication Dept", "code" => "AM", "org_unit_name" => "Department of Applied Mechanics", "org_unit_type" => "Department", "metric" => "publications", "year" => 2019, "value" => 79],
        ["category" => "Publication Dept", "code" => "AM", "org_unit_name" => "Department of Applied Mechanics", "org_unit_type" => "Department", "metric" => "publications", "year" => 2020, "value" => 69],
        ["category" => "Publication Dept", "code" => "AM", "org_unit_name" => "Department of Applied Mechanics", "org_unit_type" => "Department", "metric" => "publications", "year" => 2021, "value" => 100],
        ["category" => "Publication Dept", "code" => "AM", "org_unit_name" => "Department of Applied Mechanics", "org_unit_type" => "Department", "metric" => "publications", "year" => 2022, "value" => 100],
        ["category" => "Publication Dept", "code" => "AM", "org_unit_name" => "Department of Applied Mechanics", "org_unit_type" => "Department", "metric" => "publications", "year" => 2023, "value" => 164],
        ["category" => "Publication Dept", "code" => "AM", "org_unit_name" => "Department of Applied Mechanics", "org_unit_type" => "Department", "metric" => "publications", "year" => 2024, "value" => 148],
        ["category" => "Publication Dept", "code" => "AM", "org_unit_name" => "Department of Applied Mechanics", "org_unit_type" => "Department", "metric" => "publications", "year" => 2025, "value" => 107],
        ["category" => "Publication Dept", "code" => "AM", "org_unit_name" => "Department of Applied Mechanics", "org_unit_type" => "Department", "metric" => "publications_total_2015_2025", "year" => null, "value" => 1040],
        ["category" => "Publication Dept", "code" => "AM", "org_unit_name" => "Department of Applied Mechanics", "org_unit_type" => "Department", "metric" => "citations_total", "year" => null, "value" => 14020],

        // Department of Biochemical Engineering and Biotechnology (DBEB)
        ["category" => "Publication Dept", "code" => "DBEB", "org_unit_name" => "Department of Biochemical Engineering and Biotechnology", "org_unit_type" => "Department", "metric" => "publications", "year" => 2015, "value" => 47],
        ["category" => "Publication Dept", "code" => "DBEB", "org_unit_name" => "Department of Biochemical Engineering and Biotechnology", "org_unit_type" => "Department", "metric" => "publications", "year" => 2016, "value" => 56],
        ["category" => "Publication Dept", "code" => "DBEB", "org_unit_name" => "Department of Biochemical Engineering and Biotechnology", "org_unit_type" => "Department", "metric" => "publications", "year" => 2017, "value" => 73],
        ["category" => "Publication Dept", "code" => "DBEB", "org_unit_name" => "Department of Biochemical Engineering and Biotechnology", "org_unit_type" => "Department", "metric" => "publications", "year" => 2018, "value" => 66],
        ["category" => "Publication Dept", "code" => "DBEB", "org_unit_name" => "Department of Biochemical Engineering and Biotechnology", "org_unit_type" => "Department", "metric" => "publications", "year" => 2019, "value" => 68],
        ["category" => "Publication Dept", "code" => "DBEB", "org_unit_name" => "Department of Biochemical Engineering and Biotechnology", "org_unit_type" => "Department", "metric" => "publications", "year" => 2020, "value" => 77],
        ["category" => "Publication Dept", "code" => "DBEB", "org_unit_name" => "Department of Biochemical Engineering and Biotechnology", "org_unit_type" => "Department", "metric" => "publications", "year" => 2021, "value" => 117],
        ["category" => "Publication Dept", "code" => "DBEB", "org_unit_name" => "Department of Biochemical Engineering and Biotechnology", "org_unit_type" => "Department", "metric" => "publications", "year" => 2022, "value" => 140],
        ["category" => "Publication Dept", "code" => "DBEB", "org_unit_name" => "Department of Biochemical Engineering and Biotechnology", "org_unit_type" => "Department", "metric" => "publications", "year" => 2023, "value" => 126],
        ["category" => "Publication Dept", "code" => "DBEB", "org_unit_name" => "Department of Biochemical Engineering and Biotechnology", "org_unit_type" => "Department", "metric" => "publications", "year" => 2024, "value" => 128],
        ["category" => "Publication Dept", "code" => "DBEB", "org_unit_name" => "Department of Biochemical Engineering and Biotechnology", "org_unit_type" => "Department", "metric" => "publications", "year" => 2025, "value" => 109],
        ["category" => "Publication Dept", "code" => "DBEB", "org_unit_name" => "Department of Biochemical Engineering and Biotechnology", "org_unit_type" => "Department", "metric" => "publications_total_2015_2025", "year" => null, "value" => 1007],
        ["category" => "Publication Dept", "code" => "DBEB", "org_unit_name" => "Department of Biochemical Engineering and Biotechnology", "org_unit_type" => "Department", "metric" => "citations_total", "year" => null, "value" => 21719],

        // Department of Chemical Engineering (CHE)
        ["category" => "Publication Dept", "code" => "CHE", "org_unit_name" => "Department of Chemical Engineering", "org_unit_type" => "Department", "metric" => "publications", "year" => 2015, "value" => 98],
        ["category" => "Publication Dept", "code" => "CHE", "org_unit_name" => "Department of Chemical Engineering", "org_unit_type" => "Department", "metric" => "publications", "year" => 2016, "value" => 131],
        ["category" => "Publication Dept", "code" => "CHE", "org_unit_name" => "Department of Chemical Engineering", "org_unit_type" => "Department", "metric" => "publications", "year" => 2017, "value" => 170],
        ["category" => "Publication Dept", "code" => "CHE", "org_unit_name" => "Department of Chemical Engineering", "org_unit_type" => "Department", "metric" => "publications", "year" => 2018, "value" => 146],
        ["category" => "Publication Dept", "code" => "CHE", "org_unit_name" => "Department of Chemical Engineering", "org_unit_type" => "Department", "metric" => "publications", "year" => 2019, "value" => 153],
        ["category" => "Publication Dept", "code" => "CHE", "org_unit_name" => "Department of Chemical Engineering", "org_unit_type" => "Department", "metric" => "publications", "year" => 2020, "value" => 161],
        ["category" => "Publication Dept", "code" => "CHE", "org_unit_name" => "Department of Chemical Engineering", "org_unit_type" => "Department", "metric" => "publications", "year" => 2021, "value" => 217],
        ["category" => "Publication Dept", "code" => "CHE", "org_unit_name" => "Department of Chemical Engineering", "org_unit_type" => "Department", "metric" => "publications", "year" => 2022, "value" => 239],
        ["category" => "Publication Dept", "code" => "CHE", "org_unit_name" => "Department of Chemical Engineering", "org_unit_type" => "Department", "metric" => "publications", "year" => 2023, "value" => 228],
        ["category" => "Publication Dept", "code" => "CHE", "org_unit_name" => "Department of Chemical Engineering", "org_unit_type" => "Department", "metric" => "publications", "year" => 2024, "value" => 241],
        ["category" => "Publication Dept", "code" => "CHE", "org_unit_name" => "Department of Chemical Engineering", "org_unit_type" => "Department", "metric" => "publications", "year" => 2025, "value" => 196],
        ["category" => "Publication Dept", "code" => "CHE", "org_unit_name" => "Department of Chemical Engineering", "org_unit_type" => "Department", "metric" => "publications_total_2015_2025", "year" => null, "value" => 1980],
        ["category" => "Publication Dept", "code" => "CHE", "org_unit_name" => "Department of Chemical Engineering", "org_unit_type" => "Department", "metric" => "citations_total", "year" => null, "value" => 43529],

        // Department of Chemistry (CHY)
        ["category" => "Publication Dept", "code" => "CHY", "org_unit_name" => "Department of Chemistry", "org_unit_type" => "Department", "metric" => "publications", "year" => 2015, "value" => 106],
        ["category" => "Publication Dept", "code" => "CHY", "org_unit_name" => "Department of Chemistry", "org_unit_type" => "Department", "metric" => "publications", "year" => 2016, "value" => 137],
        ["category" => "Publication Dept", "code" => "CHY", "org_unit_name" => "Department of Chemistry", "org_unit_type" => "Department", "metric" => "publications", "year" => 2017, "value" => 159],
        ["category" => "Publication Dept", "code" => "CHY", "org_unit_name" => "Department of Chemistry", "org_unit_type" => "Department", "metric" => "publications", "year" => 2018, "value" => 122],
        ["category" => "Publication Dept", "code" => "CHY", "org_unit_name" => "Department of Chemistry", "org_unit_type" => "Department", "metric" => "publications", "year" => 2019, "value" => 157],
        ["category" => "Publication Dept", "code" => "CHY", "org_unit_name" => "Department of Chemistry", "org_unit_type" => "Department", "metric" => "publications", "year" => 2020, "value" => 165],
        ["category" => "Publication Dept", "code" => "CHY", "org_unit_name" => "Department of Chemistry", "org_unit_type" => "Department", "metric" => "publications", "year" => 2021, "value" => 200],
        ["category" => "Publication Dept", "code" => "CHY", "org_unit_name" => "Department of Chemistry", "org_unit_type" => "Department", "metric" => "publications", "year" => 2022, "value" => 245],
        ["category" => "Publication Dept", "code" => "CHY", "org_unit_name" => "Department of Chemistry", "org_unit_type" => "Department", "metric" => "publications", "year" => 2023, "value" => 261],
        ["category" => "Publication Dept", "code" => "CHY", "org_unit_name" => "Department of Chemistry", "org_unit_type" => "Department", "metric" => "publications", "year" => 2024, "value" => 291],
        ["category" => "Publication Dept", "code" => "CHY", "org_unit_name" => "Department of Chemistry", "org_unit_type" => "Department", "metric" => "publications", "year" => 2025, "value" => 312],
        ["category" => "Publication Dept", "code" => "CHY", "org_unit_name" => "Department of Chemistry", "org_unit_type" => "Department", "metric" => "publications_total_2015_2025", "year" => null, "value" => 2155],
        ["category" => "Publication Dept", "code" => "CHY", "org_unit_name" => "Department of Chemistry", "org_unit_type" => "Department", "metric" => "citations_total", "year" => null, "value" => 36489],

        // Department of Civil Engineering (CE)
        ["category" => "Publication Dept", "code" => "CE", "org_unit_name" => "Department of Civil Engineering", "org_unit_type" => "Unit", "metric" => "publications", "year" => 2015, "value" => 152],
        ["category" => "Publication Dept", "code" => "CE", "org_unit_name" => "Department of Civil Engineering", "org_unit_type" => "Unit", "metric" => "publications", "year" => 2016, "value" => 146],
        ["category" => "Publication Dept", "code" => "CE", "org_unit_name" => "Department of Civil Engineering", "org_unit_type" => "Unit", "metric" => "publications", "year" => 2017, "value" => 161],
        ["category" => "Publication Dept", "code" => "CE", "org_unit_name" => "Department of Civil Engineering", "org_unit_type" => "Unit", "metric" => "publications", "year" => 2018, "value" => 176],
        ["category" => "Publication Dept", "code" => "CE", "org_unit_name" => "Department of Civil Engineering", "org_unit_type" => "Unit", "metric" => "publications", "year" => 2019, "value" => 248],
        ["category" => "Publication Dept", "code" => "CE", "org_unit_name" => "Department of Civil Engineering", "org_unit_type" => "Unit", "metric" => "publications", "year" => 2020, "value" => 270],
        ["category" => "Publication Dept", "code" => "CE", "org_unit_name" => "Department of Civil Engineering", "org_unit_type" => "Unit", "metric" => "publications", "year" => 2021, "value" => 257],
        ["category" => "Publication Dept", "code" => "CE", "org_unit_name" => "Department of Civil Engineering", "org_unit_type" => "Unit", "metric" => "publications", "year" => 2022, "value" => 276],
        ["category" => "Publication Dept", "code" => "CE", "org_unit_name" => "Department of Civil Engineering", "org_unit_type" => "Unit", "metric" => "publications", "year" => 2023, "value" => 351],
        ["category" => "Publication Dept", "code" => "CE", "org_unit_name" => "Department of Civil Engineering", "org_unit_type" => "Unit", "metric" => "publications", "year" => 2024, "value" => 357],
        ["category" => "Publication Dept", "code" => "CE", "org_unit_name" => "Department of Civil Engineering", "org_unit_type" => "Unit", "metric" => "publications", "year" => 2025, "value" => 308],
        ["category" => "Publication Dept", "code" => "CE", "org_unit_name" => "Department of Civil Engineering", "org_unit_type" => "Unit", "metric" => "publications_total_2015_2025", "year" => null, "value" => 2702],
        ["category" => "Publication Dept", "code" => "CE", "org_unit_name" => "Department of Civil Engineering", "org_unit_type" => "Unit", "metric" => "citations_total", "year" => null, "value" => 50914],

        // Centre for Applied Research in Electronics (CARE)
        ["category" => "Publication Dept", "code" => "CARE", "org_unit_name" => "Centre for Applied Research in Electronics", "org_unit_type" => "Centre", "metric" => "publications", "year" => 2015, "value" => 46],
        ["category" => "Publication Dept", "code" => "CARE", "org_unit_name" => "Centre for Applied Research in Electronics", "org_unit_type" => "Centre", "metric" => "publications", "year" => 2016, "value" => 51],
        ["category" => "Publication Dept", "code" => "CARE", "org_unit_name" => "Centre for Applied Research in Electronics", "org_unit_type" => "Centre", "metric" => "publications", "year" => 2017, "value" => 106],
        ["category" => "Publication Dept", "code" => "CARE", "org_unit_name" => "Centre for Applied Research in Electronics", "org_unit_type" => "Centre", "metric" => "publications", "year" => 2018, "value" => 78],
        ["category" => "Publication Dept", "code" => "CARE", "org_unit_name" => "Centre for Applied Research in Electronics", "org_unit_type" => "Centre", "metric" => "publications", "year" => 2019, "value" => 105],
        ["category" => "Publication Dept", "code" => "CARE", "org_unit_name" => "Centre for Applied Research in Electronics", "org_unit_type" => "Centre", "metric" => "publications", "year" => 2020, "value" => 84],
        ["category" => "Publication Dept", "code" => "CARE", "org_unit_name" => "Centre for Applied Research in Electronics", "org_unit_type" => "Centre", "metric" => "publications", "year" => 2021, "value" => 119],
        ["category" => "Publication Dept", "code" => "CARE", "org_unit_name" => "Centre for Applied Research in Electronics", "org_unit_type" => "Centre", "metric" => "publications", "year" => 2022, "value" => 150],
        ["category" => "Publication Dept", "code" => "CARE", "org_unit_name" => "Centre for Applied Research in Electronics", "org_unit_type" => "Centre", "metric" => "publications", "year" => 2023, "value" => 112],
        ["category" => "Publication Dept", "code" => "CARE", "org_unit_name" => "Centre for Applied Research in Electronics", "org_unit_type" => "Centre", "metric" => "publications", "year" => 2024, "value" => 105],
        ["category" => "Publication Dept", "code" => "CARE", "org_unit_name" => "Centre for Applied Research in Electronics", "org_unit_type" => "Centre", "metric" => "publications", "year" => 2025, "value" => 85],
        ["category" => "Publication Dept", "code" => "CARE", "org_unit_name" => "Centre for Applied Research in Electronics", "org_unit_type" => "Centre", "metric" => "publications_total_2015_2025", "year" => null, "value" => 1041],
        ["category" => "Publication Dept", "code" => "CARE", "org_unit_name" => "Centre for Applied Research in Electronics", "org_unit_type" => "Centre", "metric" => "citations_total", "year" => null, "value" => 11557],

        // Centre for Biomedical Engineering (CBME)
        ["category" => "Publication Dept", "code" => "CBME", "org_unit_name" => "Centre for Biomedical Engineering", "org_unit_type" => "Centre", "metric" => "publications", "year" => 2015, "value" => 57],
        ["category" => "Publication Dept", "code" => "CBME", "org_unit_name" => "Centre for Biomedical Engineering", "org_unit_type" => "Centre", "metric" => "publications", "year" => 2016, "value" => 53],
        ["category" => "Publication Dept", "code" => "CBME", "org_unit_name" => "Centre for Biomedical Engineering", "org_unit_type" => "Centre", "metric" => "publications", "year" => 2017, "value" => 47],
        ["category" => "Publication Dept", "code" => "CBME", "org_unit_name" => "Centre for Biomedical Engineering", "org_unit_type" => "Centre", "metric" => "publications", "year" => 2018, "value" => 60],
        ["category" => "Publication Dept", "code" => "CBME", "org_unit_name" => "Centre for Biomedical Engineering", "org_unit_type" => "Centre", "metric" => "publications", "year" => 2019, "value" => 45],
        ["category" => "Publication Dept", "code" => "CBME", "org_unit_name" => "Centre for Biomedical Engineering", "org_unit_type" => "Centre", "metric" => "publications", "year" => 2020, "value" => 53],
        ["category" => "Publication Dept", "code" => "CBME", "org_unit_name" => "Centre for Biomedical Engineering", "org_unit_type" => "Centre", "metric" => "publications", "year" => 2021, "value" => 88],
        ["category" => "Publication Dept", "code" => "CBME", "org_unit_name" => "Centre for Biomedical Engineering", "org_unit_type" => "Centre", "metric" => "publications", "year" => 2022, "value" => 113],
    ];
    return Inertia::render('interviewTask',array('data'=>$data));
});

Route::get('users',function(DetailsController $controller){
    return response()->json($controller->getPracties());
});
//autoload
Route::get('autoload',function(){
    //return view('prepration');
    return Inertia::render('autoload');
});

Route::get('paymentDetails',[DetailsController::class,'payment_details'])->name('paymentDetails');
Route::get('doctopdf',function(){
return Inertia::render('doctopdf');
});
Route::get('autoloadPage', [DetailsController::class, 'getPractiesPro']);
/*
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
*/

Route::get('/services', function () {
    return Inertia::render('ServicesNew');
});

Route::get('/users/{id}', [DetailsController::class, 'show']);
Route::put('/users/{id}', [DetailsController::class, 'update']);
});
Route::get('MySql-Interview-Question-Answer', [DetailsController::class, 'showpage'])->middleware('indiaonly')->name('phpmysql');

Route::get('/error', function () {
    return view('error');
})->name('error.page');

Route::post('/payments/fetch', [DetailsController::class, 'fetch']);
Route::put('/payments/{id}', [DetailsController::class, 'updatesdx']); 
Route::get('/edituser/{id}', [DetailsController::class, 'edituser'])->name('editUserData');
