import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function Booking({ rental }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDuration, setIsDuration] = useState(1);

    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
        // console.log(arg);
    };
    // console.log(new Date(selectedDate).getDay());

    const calculateTotalPrice = () => {
        let total = data.duration * rental.price;
        if (selectedDate) {
            const day = new Date(selectedDate).getDay();
            if (day === 6 || day === 0) {
                total += 50000;
            }
        }
        return total;
    };

    const { data, setData, errors, post, processing } = useForm({
        name: "",
        phone: "",
        rental_id: rental?.id,
        booking_date: "",
        duration: isDuration,
    });

    useEffect(() => {
        if (selectedDate) {
            setData("booking_date", selectedDate);
        }
        if (isDuration) {
            setData("duration", isDuration);
        }
    }, [selectedDate, isDuration]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("booking.store", rental.name));
    };

    // console.log(data);

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
            <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                <img
                    src={rental.image}
                    alt=""
                    className="object-cover w-full h-64 rounded-lg"
                />
                <div className="mt-6">
                    <p className="text-2xl font-semibold text-gray-800">
                        {rental.name}
                    </p>
                    <hr className="my-4" />
                    <p className="text-gray-600">
                        Tersedia {rental.stock} unit
                    </p>
                    <p className="font-medium text-gray-800">
                        Rp {rental.price} / jam
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block font-medium text-gray-700">
                            Nama
                        </label>
                        <TextInput
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">
                            Nomor Telepon
                        </label>
                        <TextInput
                            type="tel"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                        <InputError message={errors.phone} className="mt-2" />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">
                            Tanggal Booking
                        </label>
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            dateClick={handleDateClick}
                            selectable={true}
                            weekends={true}
                        />
                        {selectedDate && (
                            <p className="mt-2 text-sm text-indigo-600">
                                Tanggal dipilih: {selectedDate}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">
                            Durasi (sesi per jam)
                        </label>
                        {/* <TextInput
                            type="number"
                            min="1"
                            value={data.duration}
                            onChange={(e) =>
                                setData("duration", e.target.value)
                            }
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        /> */}
                        <div className="flex items-center mt-2 space-x-2">
                            <button
                                type="button"
                                onClick={() =>
                                    setIsDuration((prev) => prev - 1)
                                }
                                className="flex items-center justify-center w-8 h-8 border"
                                disabled={isDuration <= 1}
                            >
                                -
                            </button>
                            <span>{isDuration} jam</span>
                            <button
                                type="button"
                                onClick={() =>
                                    setIsDuration((prev) => prev + 1)
                                }
                                className="flex items-center justify-center w-8 h-8 border"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                        Total: Rp {calculateTotalPrice()}
                    </div>
                    {selectedDate &&
                        [0, 6].includes(new Date(selectedDate).getDay()) && (
                            <small className="font-bold text-red-600">
                                *Tambahan biaya weekend sebesar Rp 50000
                            </small>
                        )}
                    <button
                        className="w-full px-12 py-4 text-white bg-indigo-600 border rounded-full hover:bg-indigo-500 disabled:bg-gray-500"
                        disabled={processing}
                    >
                        Pay Now
                    </button>
                </form>
            </div>
        </div>
    );
}
