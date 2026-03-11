<?php

namespace App\Http\Controllers;

use App\Contracts\PaymentGatewayInterface;
use Illuminate\Http\Request;
use App\Models\Contact;
use App\Services\AddPaymentDetailsService;

class DemoPaymentController extends Controller
{
    protected $payment;

    // PayU credentials (sandbox)
    private $key = 'g8TMHL';
    private $salt = 'bTDHxCyvgtDmdydI6MZRBB7ZBf26dMnh';
    private $payuUrl = 'https://test.payu.in/_payment';

    public function __construct(PaymentGatewayInterface $payment)
    {
        $this->payment = $payment;
    }

    public function add_info(Request $request)
    {
        try {
            // 1. Validate request
            $validated = $request->validate([
                'name'    => 'required|string|max:50',
                'email'   => 'required|email',
                'service' => 'required|string|max:50',
                'message' => 'required|string|max:500',
            ]);

            // 2. Save to database
            Contact::create($validated);

            // 3. Success response
            return response()->json([
                'status'  => true,
                'message' => 'Your request has been submitted successfully!',
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {

            // ❌ Validation error
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {

            // ❌ Any other server error
            return response()->json([
                'status'  => false,
                'message' => 'Something went wrong. Please try again later.',
            ], 500);
        }
    }

    // Step 1: Show Pay Page
    public function payPage()
    {
        return view('pay', ['amount' => 200]);
    }

    // Step 2: Process Payment → render PayU auto-submit form
    public function processPayment(Request $request,AddPaymentDetailsService $service)
    {
       
        

        $params = [
            'txnid' => 'TXN'.time(),
            'amount' => $request->amount,
            'productinfo' => 'Demo Product',
            'firstname' => 'John',
            'email' => 'john@example.com',
            'phone' => '9999999999',
            'udf1' => '',
            'udf2' => '',
            'udf3' => '',
            'udf4' => '',
            'udf5' => ''
        ];

        $hash = $this->generateHash($params);
        $payData = array('order_id'=>'TXN'.time(),'amount'=>$request->amount,'status'=>'pending','bank_response'=>'');
        //$add_details =  new AddPaymentDetailsService();
        if(!$service->addpaymentdata($payData))
        {
            return redirect()->back()->with('error', 'Payment initialization failed');
            exit;
        }
        
        return view('payu-form', [
            'params' => $params,
            'hash' => $hash,
            'key' => $this->key,
            'payuUrl' => $this->payuUrl
        ]);
    }

    // Step 3: Success Page (callback from PayU)
    public function successPage(Request $request,AddPaymentDetailsService $service)
    {
        // \Log::info("PayU SUCCESS HIT", $request->all());

        // return response()->json([
        //     'status' => 'SUCCESS RECEIVED',
        //     'data' => $request->all()
        // ]);
        //$data = $request->all();
        // echo "<pre>";
        // print_r($request->all());
        // echo "</pre>";
        // exit;
        $order_id = $request->txnid;
        //dd($request->all());
        //echo $order_id ;
        $data = [
            'status' => 'success',
            'bank_response' => json_encode($request->all())
        ];
        $result = $service->updatePayment($data,$order_id);
        //dd($result);
        //exit;
        if ($result) 
        {
            $rdata = $request->all();
            return view('payment-success', ['data' => $rdata]);
            //return redirect()->route('payment-success', ['data' => $rdata]);

        } 
        else 
        {
            $rdata = $request->all();
            return view('payment-failure', ['data' => $rdata]);
        }
        //return view('payment-success', ['data' => $data]);
    }

    // Step 4: Failure Page (callback from PayU)
    public function failurePage(Request $request)
    {
        $data = $request->all();
        return view('payment-failure', ['data' => $data]);
    }

    // Hash generator
    private function generateHash($params)
    {
        $hashString = $this->key.'|'.$params['txnid'].'|'.$params['amount'].'|'.$params['productinfo'].'|'.
                      $params['firstname'].'|'.$params['email'].'|'.$params['udf1'].'|'.$params['udf2'].'|'.
                      $params['udf3'].'|'.$params['udf4'].'|'.$params['udf5'].'||||||'.$this->salt;

        return strtolower(hash('sha512', $hashString));
    }
}
