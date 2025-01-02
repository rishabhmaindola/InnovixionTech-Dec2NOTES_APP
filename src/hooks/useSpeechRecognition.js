import { useState, useEffect } from "react";

export function useSpeechRecognition() {
    const [transcript, setTranscript] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState(null);
    const [speechTimer, setSpeechTimer] = useState(0);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setError("Speech recognition is not supported in this browser.");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";
        let speechTimerInterval;
        recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript;
            setTranscript(spokenText);
        };
        recognition.onerror = (event) => {
            setError(event.error);
        };
        recognition.onend = () => {
            setIsListening(false);
            clearInterval(speechTimerInterval);
        };
        if (isListening) {
            speechTimerInterval = setInterval(() => {
                setSpeechTimer((prevSpeechTimer) => prevSpeechTimer + 1);
            }, 1000);
        } else {
            clearInterval(speechTimerInterval);
        }

        const startListening = () => {
            recognition.start();
            setIsListening(true);
            setSpeechTimer(0);
            setTimeout(() => {
                stopListening();
            }, 12000);
        };

        const stopListening = () => {
            recognition.stop();
            setIsListening(false);
        };

        useSpeechRecognition.startListening = startListening;
        useSpeechRecognition.stopListening = stopListening;
        return () => {
            recognition.stop();
            clearInterval(speechTimerInterval);
        };
    }, [isListening]);

    return {
        transcript,
        isListening,
        error,
        startListening: useSpeechRecognition.startListening,
        stopListening: useSpeechRecognition.stopListening,
        speechTimer,
    };
}
