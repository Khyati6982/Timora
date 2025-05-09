import React from 'react';

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-[200px]">
            <div className="flex space-x-2">
                <div className="w-4 h-4 bg-yellow-900 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-yellow-900 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-yellow-900 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
};

export default Loader;
