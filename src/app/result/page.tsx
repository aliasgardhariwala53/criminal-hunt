import { simulateFugitiveLocation, checkCapture } from '../actions/gameActions';
type SearchParams = {
    cop1City: string;
    cop2City: string;
    cop3City: string;
    cop1Vehicle: string;
    cop2Vehicle: string;
    cop3Vehicle: string;
};

type PageProps = {
    searchParams: SearchParams;
};
export default async function Result({ searchParams }: PageProps) {
    const fugitiveLocationId = await simulateFugitiveLocation();

    const { success, copName } = await checkCapture(fugitiveLocationId, {
        cop1City: Number(searchParams.cop1City),
        cop2City: Number(searchParams.cop2City),
        cop3City: Number(searchParams.cop3City),
        cop1Vehicle: Number(searchParams.cop1Vehicle),
        cop2Vehicle: Number(searchParams.cop2Vehicle),
        cop3Vehicle: Number(searchParams.cop3Vehicle),
    });

    console.log(copName,'${copName?.toLowerCase()}City')
    const copImage = `/cops/${copName?.toLowerCase()?.replace(' ', '')}.png`;
    const selectedCity = searchParams?.[`${copName?.toLowerCase()?.replace(' ', '')}City`];
    const cityImage = `/cities/${selectedCity?.toLowerCase()?.replace(' ', '-')}.png`;
    console.log(selectedCity,searchParams,'${copName?.toLowerCase()}City')

    return (
        <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/backgrounds/result.jpg')" }}>
            <div className="flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-50">
                <h1 className="text-6xl font-bold text-white mb-8">Result</h1>
                {success ? (
                    <>
                        <p className="text-4xl text-green-500 mb-8">{copName} successfully captured the fugitive!</p>
                        <div className="flex space-x-8">
                            <img src={copImage} alt={copName} className="w-48 h-48 rounded-full" />
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