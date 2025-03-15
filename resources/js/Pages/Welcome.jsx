import { Head, Link } from "@inertiajs/react";

export default function Welcome({ rentals }) {
    console.log(rentals);
    return (
        <>
            <Head title="Welcome" />
            <div className="flex items-center justify-center mx-auto bg-gray-100">
                <div className="relative w-full min-h-screen bg-white shadow-sm max-w-screen-2xl">
                    <div className="relative w-full">
                        <img
                            src="https://images.pexels.com/photos/7887634/pexels-photo-7887634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt=""
                            className="w-full h-[30rem] object-cover object-center"
                        />
                        <div className="absolute inset-0 flex items-center justify-center w-full px-6 text-center text-white">
                            <div>
                                <h1 className="text-2xl font-bold">
                                    Rental PS Termurah
                                </h1>
                                <p className="text-sm">
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Commodi, repudiandae.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 px-6 mt-8">
                        {rentals.map((data, index) => (
                            <Link key={index} href={`/rental/${data.name}`}>
                                <div className="p-8 transition-all duration-300 border shadow-sm rounded-2xl hover:shadow-lg">
                                    <img src={data.image} alt="" />
                                    <div className="mt-4">
                                        <p className="text-xl font-semibold tracking-widest">
                                            {data.name}
                                        </p>
                                        <p className="mt-1">Rp {data.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <footer className="mt-[5rem]"></footer>
                </div>
            </div>
        </>
    );
}
