<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rental extends Model
{
    protected $guarded = ['id'];

    public function bookings()
    {
        $this->hasMany(Booking::class);
    }
}
