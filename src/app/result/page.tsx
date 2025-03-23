"use client"; 

import { useState, useEffect } from 'react';
import { simulateFugitiveLocation, checkCapture } from '../actions/gameActions';

type SearchParams = {
    cop1City: string;
    cop2City: string;
    cop3City: string;
    cop1Vehicle: string;
    cop2Vehicle: string;
    cop3Vehicle: string;
    [key: `${string}City`]: string; 
};

type PageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Result({ searchParams }: PageProps) {
    const [params, setParams] = useState<SearchParams | null>(null);
    const [fugitiveLocationId, setFugitiveLocationId] = useState<number | null>(null);
    const [captureResult, setCaptureResult] = useState<{ success: boolean; copName: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        searchParams
            .then((resolvedParams) => {
                const castedParams = resolvedParams as unknown as SearchParams;
                setParams(castedParams);
                return simulateFugitiveLocation()
                    .then((locationId) => {
                        setFugitiveLocationId(locationId);
                        return checkCapture(locationId, {
                            cop1City: Number(castedParams?.cop1City),
                            cop2City: Number(castedParams?.cop2City),
                            cop3City: Number(castedParams?.cop3City),
                            cop1Vehicle: Number(castedParams?.cop1Vehicle),
                            cop2Vehicle: Number(castedParams?.cop2Vehicle),
                            cop3Vehicle: Number(castedParams?.cop3Vehicle),
                        });
                    });
            })
            .then((result) => {
                setCaptureResult(result);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, [searchParams]);

    const copImage = `/cops/${captureResult?.copName?.toLowerCase()?.replace(' ', '')}.png`;
    const selectedCity = params?.[`${captureResult?.copName?.toLowerCase()?.replace(' ', '')}City` as keyof SearchParams]; // Fix dynamic key access
    const cityImage = `/cities/${selectedCity?.toLowerCase()?.replace(' ', '-')}.png`;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-50">
                <p className="text-4xl text-white">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/backgrounds/result.jpg')" }}>
            <div className="flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-50">
                <h1 className="text-6xl font-bold text-white mb-8">Result</h1>
                {captureResult?.success ? (
                    <>
                        <p className="text-4xl text-green-500 mb-8">{captureResult.copName} successfully captured the fugitive!</p>
                        <div className="flex space-x-8">
                            <img src={copImage} alt={captureResult.copName} className="w-48 h-48 rounded-full" />
                            <img src={cityImage} alt="City" className="w-48 h-48 rounded-lg" />
                        </div>
                    </>
                ) : (
                    <p className="text-4xl text-red-500 mb-8">The fugitive escaped!</p>
                )}
                <a href="/">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-2xl mt-8">
                        Play Again
                    </button>
                </a>
            </div>
        </div>
    );
}