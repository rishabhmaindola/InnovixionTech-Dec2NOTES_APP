import { useEffect, useRef } from 'react';

const useKey = (key, callback) => {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const handle = (event) => {
            if (event.code === key) {
                callbackRef.current(event);
            }
        };
        document.addEventListener("keydown", handle);
        return () => document.removeEventListener("keydown", handle);
    }, [key]);
};

export default useKey;
