import React, { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners';
import messages from '../../list/loading_message';

const Loading = ({ isLoading }) => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (isLoading) {
            const randomIndex = Math.floor(Math.random() * messages.length);
            setMessage(messages[randomIndex]);
        }
    }, [isLoading]);

    let color = "#ffffff";

    return (
        <div className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 ${isLoading ? 'z-50' : 'hidden'}`}>
            <HashLoader
                color={color}
                loading={isLoading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <div className='text-white text-2xl font-bold mt-8'>Please Wait...</div>
            <div className='text-white text-2xl font-bold mt-4'>{message}</div>
        </div>
    )
}

export default Loading