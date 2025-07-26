export default function SkeletonCard() {
    return (
        <div className="bg-white border p-4 rounded-md shadow-md animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-2/3 mb-4" />

            <div className="w-full h-40 bg-gray-200 rounded mb-4" />

            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
            <div className="h-4 bg-gray-300 rounded w-full mb-2" />
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-4" />

            <div className="h-10 bg-gray-400 rounded w-32" />
        </div>
    );
}
