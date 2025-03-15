import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function Manage({ rental }) {
    const isEditing = rental ? true : false;
    const [selectedImage, setSelectedImage] = useState();
    const [prevImage, setPrevImage] = useState(
        isEditing
            ? rental.image
            : "https://contralacorrupcion.mx/encuesta-mcci-reforma-2022/media/images/charts/2_1/militarizacion-obras.png"
    );
    const { data, errors, setData, post, processing } = useForm({
        image: null,
        name: rental?.name ?? "",
        price: rental?.price ?? "",
        duration: rental?.duration ?? "",
        stock: rental?.stock ?? "",
        description: rental?.description ?? "",
        _method: isEditing ? "PUT" : "",
    });

    const handleChangeFileImage = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);

        setPrevImage(url);
        setSelectedImage(file);

        return () => URL.revokeObjectURL(file);
    };

    // handleChangeImagePrev
    useEffect(() => {
        if (selectedImage) {
            setData("image", selectedImage);
        }
    }, [selectedImage]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            post(route("rentals.update", rental.id), {
                forceFormData: true,
                preserveScroll: true,
            });
        } else {
            post(route("rentals.store"), {
                forceFormData: true,
                preserveScroll: true,
            });
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight tracking-wider text-gray-800">
                        {isEditing ? "Edit Rental" : "Create New Rental"}
                    </h2>
                    <Link
                        href={route("rentals.index")}
                        className="px-4 py-2.5 text-xs font-medium tracking-widest text-white uppercase transition-all duration-300 bg-indigo-600 rounded-md hover:bg-indigo-500"
                    >
                        Back
                    </Link>
                </div>
            }
        >
            <Head title={isEditing ? "Edit Rental" : "Create New Rental"} />

            <div className="py-12">
                <div className="mx-auto space-y-4 max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-8 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div>
                                <InputLabel value="Image" />
                                <TextInput
                                    id="image"
                                    type="file"
                                    name="image"
                                    className={`mt-2 w-full`}
                                    onChange={handleChangeFileImage}
                                />
                                <InputError
                                    message={errors.image}
                                    className="mt-2"
                                />
                                <img
                                    src={prevImage}
                                    alt=""
                                    className="w-auto h-[8rem] mt-2 rounded-md"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel value="Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        className={`mt-2 w-full`}
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel value="Price" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        name="price"
                                        className={`mt-2 w-full`}
                                        value={data.price}
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.price}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel value="Duration" />
                                    <TextInput
                                        id="duration"
                                        type="number"
                                        name="duration"
                                        className={`mt-2 w-full`}
                                        value={data.duration}
                                        onChange={(e) =>
                                            setData("duration", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.duration}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <InputLabel value="Stock" />
                                    <TextInput
                                        id="stock"
                                        type="number"
                                        name="stock"
                                        className={`mt-2 w-full`}
                                        value={data.stock}
                                        onChange={(e) =>
                                            setData("stock", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.stock}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div>
                                <InputLabel value="Description" />
                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-[15rem] mt-2"
                                />
                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>
                            <PrimaryButton type="submit" disabled={processing}>
                                {isEditing ? "Save" : "Created"}
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
