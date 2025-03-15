<?php

namespace App\Http\Services;

use App\Models\Booking;

// SANDBOX_MIDTRANS_SERVER_KEY

// Set your Merchant Server Key
\Midtrans\Config::$serverKey = env('MIDTRANS_SERVER_KEY');
// Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
\Midtrans\Config::$isProduction = false;
// Set sanitization on (default)
\Midtrans\Config::$isSanitized = true;
// Set 3DS transaction for credit card to true
\Midtrans\Config::$is3ds = true;

// notif url / webhook
\Midtrans\Config::$overrideNotifUrl = env('MIDTRANS_NOTIFICATION_URL');

class MidtransServices
{
    //
    public function createTransaction(Booking $booking)
    {
        $params = array(
            'transaction_details' => [
                'order_id' => $booking->booking_code,
                'gross_amount' => $booking->total_price,
            ],
            'customer_details' => [
                'name' => $booking->name,
                'phone' => $booking->phone,
            ],
            'callbacks' => [
                'finish' => 'http://127.0.0.1:8000/payment-success',
            ]
        );

        $paymentUrl = \Midtrans\Snap::createTransaction($params)->redirect_url;

        return $paymentUrl;
    }
}
