'use client';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { getVehicles } from '../actions/vehicleActions';
import { useEffect, useState } from 'react';

const vehicleSelectionSchema = Yup.object().shape({
    cop1Vehicle: Yup.number().required('Vehicle selection is required'),
    cop2Vehicle: Yup.number()
        .required('Vehicle selection is required')
        .notOneOf([Yup.ref('cop1Vehicle')], 'Vehicle must be unique'),
    cop3Vehicle: Yup.number()
        .required('Vehicle selection is required')
        .notOneOf([Yup.ref('cop1Vehicle'), Yup.ref('cop2Vehicle')], 'Vehicle must be unique'),
});

export default function VehicleSelection() {
    const router = useRouter();
    const [vehicles, setVehicles] = useState<Record<string, any>[]>([]);

    const searchParams = useSearchParams();
    useEffect(() => {
        (async () => {
            const data = await getVehicles();
            setVehicles(data)
        })()
    }, []);

    const initialValues = {
        cop1Vehicle: '',
        cop2Vehicle: '',
        cop3Vehicle: '',
    };

    const handleSubmit = (values: { cop1Vehicle: string; cop2Vehicle: string; cop3Vehicle: string }) => {
        router.push(
            `/result?cop1City=${searchParams.get('cop1City')}&cop2City=${searchParams.get('cop2City')}&cop3City=${searchParams.get('cop3City')}&cop1Vehicle=${values.cop1Vehicle}&cop2Vehicle=${values.cop2Vehicle}&cop3Vehicle=${values.cop3Vehicle}`
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-center mb-8">Select a Vehicle for Each Cop</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={vehicleSelectionSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values }) => (
                        <Form>
                            <div className="space-y-6">
                                {['Cop 1', 'Cop 2', 'Cop 3'].map((cop, index) => {
                                    const selectedVehicle = vehicles.find(vehicle => vehicle.id === Number(values[`cop${index + 1}Vehicle`]));
                                    return (
                                        <div key={index} className="flex items-center space-x-6">
                                            <div className="flex-1">
                                                <h2 className="text-2xl font-semibold mb-4">{cop}</h2>
                                                <Field as="select" name={`cop${index + 1}Vehicle`} className="w-full p-3 border border-gray-300 rounded-lg">
                                                    <option value="">Select a vehicle</option>
                                                    {vehicles.map(vehicle => (
                                                        <option
                                                            key={vehicle.id}
                                                            value={vehicle.id}
                                                            disabled={vehicle.id === Number(values[`cop${index === 0 ? 2 : index === 1 ? 3 : 1}Vehicle`]) || vehicle.id === Number(values[`cop${index === 0 ? 3 : index === 1 ? 1 : 2}Vehicle`])}
                                                        >
                                                            {vehicle.kind}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name={`cop${index + 1}Vehicle`} component="div" className="text-red-500 mt-2" />
                                            </div>
                                            {selectedVehicle && (
                                                <div className="w-48 h-48 bg-cover bg-center rounded-lg" style={{ backgroundImage: `url('/vehicles/${selectedVehicle.kind.toLowerCase().replace(' ', '-')}.png')` }}></div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mt-8">
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}