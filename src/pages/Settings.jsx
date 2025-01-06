import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
    const [username, setUsername] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [apiKeySaved, setApiKeySaved] = useState(false);
    const navigate = useNavigate();

    const saveUsername = () => {
        localStorage.setItem("username", username);
        navigate("/");
        setUsername("");
    };

    const saveApiKey = () => {
        localStorage.setItem("apiKey", apiKey);
        setApiKeySaved(true);
        navigate("/");
        setApiKey("");
    };

    const deleteApiKey = () => {
        localStorage.removeItem("apiKey");
        setApiKey("");
        setApiKeySaved(false);
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

        const savedApiKey = localStorage.getItem("apiKey");
        if (savedApiKey) {
            setApiKey("************************");
            setApiKeySaved(true);
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
            <div className="w-1/3 flex flex-col items-center gap-4 cursor-pointer">
                <ul className="w-full list-none px-5 py-4">
                    <li className="flex flex-col gap-4">
                        <p className="text-lg font-semibold dark:text-stone-200">Gemini API Key</p>
                        <input
                            type="text"
                            value={apiKey}
                            onChange={(e) => {
                                setApiKey(e.target.value);
                                if (e.target.value === "") {
                                    setApiKeySaved(false);
                                }
                            }}
                            placeholder="Your API Key"
                            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                                apiKeySaved ? "border-green-500 focus:ring-green-500" : "border-red-500 focus:ring-red-500"
                            }`}
                        />
                        <button
                            onClick={saveApiKey}
                            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700"
                        >
                            Save
                        </button>
                        {apiKeySaved && (
                            <button
                                onClick={deleteApiKey}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mt-4"
                            >
                                Delete API Key
                            </button>
                        )}
                    </li>
                </ul>
            </div>
            <div className="flex flex-col items-center justify-center text-left">
                <ul className="flex flex-col gap-5">
                    <li className="flex items-center dark:text-stone-200">
                        <p className="font-rethink font-semibold text-black">
                            <strong>ALT + A :</strong>
                        </p>{" "}
                        Shortcut key for opening the chatbot.
                    </li>
                    <li className="flex items-center dark:text-stone-200">
                        <p className="font-rethink font-semibold text-black">
                            <strong>ALT + R :</strong>
                        </p>{" "}
                        Shortcut key for opening the mic.
                    </li>
                    <li className="flex items-center dark:text-stone-200">
                        <p className="font-rethink font-semibold text-black">
                            <strong>ENTER :</strong>
                        </p>{" "}
                        For sending prompt.
                    </li>
                </ul>
            </div>
            <div className="flex flex-col items-center justify-center mt-8 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Your API key is stored securely in your browser's local storage. It is not shared with any external servers and remains completely safe to save.
                </p>
            </div>
        </div>
    );
}

export default Settings;
