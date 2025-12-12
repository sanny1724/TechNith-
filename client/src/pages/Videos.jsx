const Videos = () => {
    return (
        <div className="pt-32 px-6 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Latest Videos</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="bg-tech-card rounded-xl overflow-hidden border border-gray-700 shadow-xl">
                        <div className="h-48 bg-gray-800 flex items-center justify-center">
                            <span className="text-gray-500">Video Thumbnail</span>
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">Build a Full Stack App</h3>
                            <div className="flex justify-between text-gray-400 text-sm">
                                <span>10K views</span>
                                <span>2 days ago</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Videos;
