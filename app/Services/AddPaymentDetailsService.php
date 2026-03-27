<?php
namespace App\Services;
use App\Models\Payment;
use App\Interfaces\UserServiceInterface;

class AddPaymentDetailsService  implements UserServiceInterface
{
    public function addpaymentdata(Array $data)
    {
         if (Payment::create($data)) {
            return true;
        }

        return false;
    }
    public function updatePayment(array $data, $order_id)
    {
        try {

            $order = Payment::where('order_id', $order_id)->first();

            if (!$order) {
                return "Order not found";
            }

            $order->status = $data['status'];
            $order->bank_response = $data['bank_response'] ?? '';
            $order->updated_at = now();

            if($order->save()){
                return true;
            }

            return "Save failed";

        } catch (\Exception $e) {

            Log::error($e->getMessage());

            return $e->getMessage();
        }
    }
}

?>