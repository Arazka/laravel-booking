<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $guarded = ['id'];

    public function rental()
    {
        return $this->belongsTo(Rental::class);
    }
}
