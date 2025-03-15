<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookingRequest;
use App\Http\Services\MidtransServices;
use App\Models\Booking;
use App\Models\Rental;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Str;

class HomeController extends Controller
{
    protected $midtranServices;

    public function __construct(MidtransServices $midtransServices)
    {
        $this->midtranServices = $midtransServices;
    }

    public function index()
    {
        $rentals = Rental::all();

        return Inertia::render("Welcome", compact('rentals'));
    }

    public function detail($name)
    {
        $rental = Rental::where('name', $name)->first();

        return Inertia::render("Rental/Detail", compact('rental'));
    }

    public function booking($name)
    {
        $rental = Rental::where('name', $name)->first();

        return Inertia::render("Rental/Booking", compact('rental'));
    }

    public function bookingStore (BookingRequest $request)
    {
        // dd($request->all());
        $validated = $request->validated();

        $rental = Rental::findOrFail($validated['rental_id']);
        $duration = $validated['duration'];
        $totalPrice = $rental->price * $duration;

        // calculate total price if booking date in weekend
        $bookingDate = Carbon::parse($validated['booking_date']);
        if ($bookingDate->isWeekend()) {
            $totalPrice += 50000;
        }

        // generating booking code
        do {
            $bookingCode = 'BK-' . strtoupper(Str::random(8));
            $checkBookingCode = Booking::where('booking_code', $bookingCode)->exists();
        } while ($checkBookingCode);

        // dd($validated['booking_date']);
        // dd($bookingDate);

        // create booking
        $booking = Booking::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'rental_id' => $rental->id,
            'booking_date' => $validated['booking_date'],
            'duration' => $duration,
            'total_price' => $totalPrice,
            'status' => "pending",
            'booking_code' => $bookingCode,
        ]);

        // booking with eager lazy loading
        $booking->load('rental');

        // get payment url
        $paymentUrl = $this->midtranServices->createTransaction($booking);

        return Inertia::render("Rental/BookingSuccess", [
            'paymentUrl' => $paymentUrl,
            'booking' => $booking
        ]);
    }

    public function bookingSuccess()
    {
        return Inertia::render("Rental/BookingSuccess");
    }

    public function paymentSuccess()
    {
        return Inertia::render("Rental/PaymentSuccess");
    }
}
