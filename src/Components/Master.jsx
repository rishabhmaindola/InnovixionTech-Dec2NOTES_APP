import React, { useState, useEffect } from 'react';

function Master() {
    const [username, setUsername] = useState(localStorage.getItem('username') || null);

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'username') {
                setUsername(event.newValue);
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div className="w-full p-2 flex items-center justify-between xs:text-2xl sm:text-2xl text-2xl lg:text-3xl xl:text-3xl font-bold">
            {username === null ? (
                <h2 className='text-black dark:text-stone-200' >Notepad</h2>
            ) : (
                <h2 className='text-black dark:text-stone-200'>{username}'s Notepad</h2>
            )}
        </div>
    );
}

export default Master;
