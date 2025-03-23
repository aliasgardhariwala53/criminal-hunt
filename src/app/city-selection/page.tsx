'use client';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { getCities } from '../actions/cityActions';
import React, { useEffect, useState } from 'react';

const citySelectionSchema = Yup.object().shape({
    cop1City: Yup.number().required('City selection is required'),
    cop2City: Yup.number()
        .required('City selection is required')
        .notOneOf([Yup.ref('cop1City')], 'City must be unique'),
    cop3City: Yup.number()
        .required('City selection is required')
        .notOneOf([Yup.ref('cop1City'), Yup.ref('cop2City')], 'City must be unique'),
});

export default function CitySelection() {
    const router = useRouter();
    const [cities, setCities] = useState<Record<string, any>[]>([]);

    useEffect(() => {
        (async () => {
            const data = await getCities();
            setCities(data);
        })();
    }, []);

    const initialValues = {
        cop1City: '',
        cop2City: '',
        cop3City: '',
    };

    const handleSubmit = (values: { cop1City: string; cop2City: string; cop3City: string }) => {
        router.push(`/vehicle-selection?cop1City=${values.cop1City}&cop2City=${values.cop2City}&cop3City=${values.cop3City}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-center mb-8">Select a City for Each Cop</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={citySelectionSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values }) => (
                        <Form role="form">
                            <div className="space-y-6">
                                {['Cop 1', 'Cop 2', 'Cop 3'].map((cop, index) => {
                                   const selectedCity = cities.find(city => city.id === Number(values[`cop${index + 1}City` as keyof typeof values]));
                                    return (
                                        <div key={index} className="flex items-center space-x-6">
                                            <div className="flex-1">
                                                <h2 className="text-2xl font-semibold mb-4">{cop}</h2>
                                                <Field as="select" name={`cop${index + 1}City`} className="w-full p-3 border border-gray-300 rounded-lg">
                                                    <option value="">Select a city</option>
                                                    {cities.map(city => (
                                                        <option
                                                            key={city.id}
                                                            value={city.id}
                                                            disabled={city.id === Number(values[`cop${index === 0 ? 2 : index === 1 ? 3 : 1}City`]) || city.id === Number(values[`cop${index === 0 ? 3 : index === 1 ? 1 : 2}City`])}
                                                        >
                                                            {city.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name={`cop${index + 1}City`} component="div" className="text-red-500 mt-2" />
                                            </div>
                                            {selectedCity && (
                                                <div className="w-48 h-48 bg-cover bg-center rounded-lg" style={{ backgroundImage: `url('/cities/${selectedCity.name.toLowerCase().replace(' ', '-')}.png')` }}></div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mt-8">
                                Next
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}