import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const saveUsername = () => {
        localStorage.setItem("username", username);
        console.log(`Username saved: ${username}`);
        navigate("/");
        setUsername("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            saveUsername();
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        
    }, []);

    return (
        <div className="flex flex-col items-center justify-around w-full min-h-screen bg-white dark:bg-linear-225 dark:from-zinc-500 dark:via-stone-600 dark:to-zinc-800">
            <div className="w-1/3 flex flex-col items-center gap-4 cursor-pointer">
                <ul className="w-full list-none px-5 py-4">
                    <li className="flex flex-col gap-4">
                        <p className="text-lg font-semibold dark:text-stone-200">Username</p>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Enter your username"
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={saveUsername}
                            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700"
                        >
                            Change
                        </button>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col items-center justify-center text-left">
                <ul className="flex flex-col  gap-5 ">
                    <li className="flex items-center dark:text-stone-200"><p className="font-rethink font-semibold text-black"><strong>ALT + A :</strong></p> Shortcut key for opening the chatbot.</li>
                    <li className="flex items-center dark:text-stone-200"><p className="font-rethink font-semibold text-black"><strong>ALT + R :</strong></p> Shortcut key for opening the mic.</li>
                    <li className="flex items-center dark:text-stone-200"><p className="font-rethink font-semibold text-black"><strong>ENTER :</strong></p> For sending prompt.</li>
                </ul>
            </div>
        </div>
    );
}

export default Settings;
