import React from 'react';

const Loading = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>

            <h1 className='text-4xl font-bold text-primary'>L<span className="loading loading-spinner text-secondary"></span>ading
            </h1>
        </div>
    );
};

export default Loading;