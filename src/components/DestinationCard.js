export default function DestinationCard({ destination, handleAnswer }) {
    return (
     
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-xl">{destination.clues[0]}</p>
            <div className="mt-4 space-x-4">
                <button onClick={() => handleAnswer(destination.city)} className="px-4 py-2 bg-green-500 rounded">Correct</button>
                <button onClick={() => handleAnswer('Wrong Answer')} className="px-4 py-2 bg-red-500 rounded">Wrong</button>
            </div>
        </div>
    );
}
