import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function useTypewriter(text, speed) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let index = 0;
        setDisplayedText("");
        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text[index]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return displayedText;
}

function Master() {
    const [username, setUsername] = useState(localStorage.getItem("username") || null);
    const typewriterText = useTypewriter(
        username ? `${username}'s Notepad` : "Notepad",
        150
    );

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === "username") {
                setUsername(event.newValue);
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <div className="w-full p-2 flex items-center justify-between xs:text-2xl sm:text-2xl text-2xl lg:text-3xl xl:text-3xl font-bold">
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    transition: { duration: 1.5, ease: "easeOut" },
                }}
                className="text-zinc-800 dark:text-stone-200"
            >
                {typewriterText}
            </motion.h2>
        </div>
    );
}

export default Master;
