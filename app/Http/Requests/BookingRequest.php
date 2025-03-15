<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:15|regex:/^([0-9\s\-\+\(\)]*)$/',
            'rental_id' => 'exists:rentals,id',
            'booking_date' => 'string',
            'duration' => 'required|integer|min:1',
            'booking_code' => 'string|unique:bookings,booking_code,except,id'
        ];
    }
}
