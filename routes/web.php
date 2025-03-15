<?php

use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\Admin\RentalController;
use App\Http\Controllers\Client\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('rentals', RentalController::class)->names('rentals');

    Route::get("/bookings", [BookingController::class, 'index'])->name('bookings.index');
});

Route::get("/", [HomeController::class, 'index'])->name('home');
Route::get("/rental/{name}", [HomeController::class, 'detail']);
Route::get("/rental/{name}/booking", [HomeController::class, 'booking']);
Route::post("/rental/{name}/booking", [HomeController::class, 'bookingStore'])->name('booking.store');
Route::get("/payment-success", [HomeController::class, 'paymentSuccess']);

require __DIR__.'/auth.php';
