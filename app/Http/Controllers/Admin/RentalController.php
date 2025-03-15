<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RentalRequest;
use App\Models\Rental;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RentalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rentals = Rental::latest()->paginate(5);

        return Inertia::render("Admin/Rentals/Index", compact('rentals'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Admin/Rentals/Manage");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RentalRequest $request)
    {
        $imageName = $request->file('image')->getClientOriginalName() . '-' . time() . '-' . $request->file('image')->getClientOriginalExtension();
        $imagePath = $request->file('image')->storeAs('rentals', $imageName, 'public');
        Rental::create(array_merge($request->only('name','price','duration','stock','description'), [
            'image' => asset('storage/' . $imagePath)
        ]));

        return redirect()->route("rentals.index")->with('success','Rental created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $rental = Rental::findOrFail($id);

        return Inertia::render("Admin/Rentals/Manage", compact('rental'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RentalRequest $request, $id)
    {
        $rental = Rental::findOrFail($id);

        $rental->name = $request->name;
        $rental->price = $request->price;
        $rental->duration = $request->duration;
        $rental->stock = $request->stock;
        $rental->description = $request->description;

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($rental->image);

            $imageName = $request->file('image')->getClientOriginalName() . '-' . time() . '-' . $request->file('image')->getClientOriginalExtension();
            $imagePath = $request->file('image')->storeAs('rentals', $imageName, 'public');

            $rental->image = asset('storage/'.$imagePath);
        }

        $rental->save();

        return redirect()->route("rentals.index")->with('success','Rental updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $rental = Rental::findOrFail($id);
        Storage::disk('public')->delete($rental->image);
        $rental->delete();

        return redirect()->route("rentals.index")->with('success','Rental deleted successfully!');
    }
}
