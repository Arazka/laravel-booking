<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with('rental')->latest()->paginate(5);

        return Inertia::render("Admin/Bookings/Index", compact('bookings'));
    }
}
