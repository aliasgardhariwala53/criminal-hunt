
export default function Home() {
    return (
        <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/criminal.png')" }}>
            <div className="flex flex-col items-center justify-center min-h-screen bg-opacity-50">
                <h1 className="text-6xl font-bold text-blue-200 mb-8">Criminal Hunt</h1>
                <a href="/city-selection">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-2xl">
                        Start Game
                    </button>
                </a>
            </div>
        </div>
    );
}