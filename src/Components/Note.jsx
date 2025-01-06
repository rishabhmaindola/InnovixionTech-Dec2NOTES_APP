import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoCopy, IoMic } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { PiOpenAiLogoBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { MdAssignmentAdd } from "react-icons/md";
import { FaArrowCircleUp } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import fetchAI from "../utils/fetchAI";
import useKey from "../hooks/useKey";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
  ],
};

let timer = 500,
  timeout;

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};


function Note(props) {
  const [value, setValue] = useState("");
  const [inputText, setInputText] = useState("");
  const [aiResponse, setAIResponse] = useState("");
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [aiLoading, setAILoading] = useState(false);
  const [aiError, setAIError] = useState(null);

  const isMobileScreen = window.matchMedia("(max-width: 425px)").matches;


  const toggleInput = () => {
    if (aiLoading) {
      setIsOpen(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    setValue(props.note.text);
  }, [props.note.text]);

  const formatDate = (value) => {
    if (!value) return "";

    const date = new Date(value);
    const monthNames = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    let hrs = date.getHours() % 12 || 12;
    let amPm = date.getHours() >= 12 ? "PM" : "AM";
    let min = date.getMinutes().toString().padStart(2, "0");
    let day = date.getDate();
    const month = monthNames[date.getMonth()];

    return `${hrs}:${min} ${amPm} ${day} ${month}`;
  };

  const debounce = (func) => {
    clearTimeout(timeout);
    timeout = setTimeout(func, timer);
  };

  const handleTextChange = (text) => {
    setValue(text);
    debounce(() => props.updateText(text, props.note.id));
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const copyToClipboard = () => {
    const plainText = document.createElement("div");
    plainText.innerHTML = value;
    const textToCopy = plainText.textContent || plainText.innerText || "";
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => console.error("Failed to copy text: ", err));
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        alert("Copy Failed!");
      }
      document.body.removeChild(textArea);
    }
  };

  const handleAIResponse = async () => {
    if (!inputText) {
      setAIError("Empty Prompt!");
      setTimeout(() => setAIError(null), 2000);
    };
    setAILoading(true);
    setAIResponse("");
    try {
      const result = await fetchAI(inputText);
      let currentText = "";
      for (let i = 0; i < result.length; i++) {
        currentText += result[i];
        setAIResponse(currentText);
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      setInputText("");
    } catch (error) {
      console.log(error);
      setAIError(error);
      setTimeout(() => setAIError(null), 2000);
    } finally {
      setAILoading(false);
      setTimeout(() => setAIError(null), 2000);
    }
  }

  const { transcript, isListening, error, startListening, speechTimer } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
    if (error) {
      setAIError(error);
      setTimeout(() => setAIError(null), 2000);
    }
  }, [transcript, error]);

  useKey("Enter", () => {
    if (inputText.trim() !== "" && isOpen) {
      handleAIResponse();
    } else {
      setAIError("Empty Prompt!");
      setTimeout(() => setAIError(null), 2000);
    }
  });

  useKey("KeyA", (event) => {
    if (event.altKey) {
      toggleInput();
    }
  });

  useKey("KeyR", (event) => {
    if (event.altKey) {
      startListening();
    }

  });

  return (
    <div
      className="p-5 my-5 h-[680px] w-full flex flex-col justify-between rounded-[30px] relative"
      style={{ backgroundColor: props.note.color }}
    >
      <motion.div
        animate={{
          height: aiResponse && isOpen ? "250px" : "0px",
          width: isMobileScreen ? "250px" : aiResponse && isOpen ? "450px" : "0px",
          opacity: aiResponse && isOpen ? 1 : 0,
        }}
        initial={{ height: "0px", width: "0px", opacity: 0 }}
        transition={{
          duration: 0.1,
          ease: "easeInOut",
        }}
        className={`absolute bottom-20 right-5 m-5 bg-stone-800 dark:bg-conic-gradient dark:drop-shadow-xl  rounded-lg shadow-lg ${aiResponse ? "p-[3px]" : "p-0"
          }`}
      >
        <div className="relative w-full h-full cursor-pointer ">
          <span className="flex bg-slate-700 text-stone-200 font-roboto font-semibold text-pretty h-full max-h-[400px] overflow-y-scroll cursor-pointer p-4 rounded-lg text-left">
            {aiResponse}
          </span>
          <motion.ul
            animate={{
              opacity: aiResponse ? 1 : 0,
              y: aiResponse ? 0 : 10,
            }}
            initial={{ opacity: 0, x: 0 }}
            transition={{
              duration: 0.1,
              ease: "easeInOut",
            }}
            className="absolute -top-7 right-0 flex items-center justify-center cursor-pointer space-x-3 z-10"
          >
            <motion.li
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer"
              onClick={() => setValue((prev) => prev + aiResponse)}
              >
              <MdAssignmentAdd />
            </motion.li>
            <motion.li
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer"
              onClick={() => setAIResponse("")}
            >
              <MdClear />
            </motion.li>
          </motion.ul>
        </div>
      </motion.div>
      <span className="flex self-end w-1/2 items-center justify-end p-1 space-x-5 xs:space-x-5 sm:space-x-5 lg:space-x-10 xl:space-x-10 ">
        <motion.div
          className="cursor-pointer text-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={copyToClipboard}
        >
          <motion.p
            className="text-xs absolute text-stone-800 dark:text-stone-200 "
            animate={{
              opacity: copied ? 1 : 0,
              y: copied ? -20 : 0,
            }}
            initial={{
              opacity: 0,
              y: 10,
              x: -10,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            copied!
          </motion.p>
          <motion.p
            className=" text-gray-800 dark:text-stone-800"
            whileTap={{ scale: 0.9 }}
          >
            {copied ? (
              <motion.p
              className="text-stone-800 dark:text-stone-200"
                exit={{ rotate: 50 }}
              >
                <TiTick />
              </motion.p>) : (
              <motion.p
              className="text-stone-800 dark:text-stone-700"
                whileTap={{ rotateY: 50 }}
              >
                <IoCopy />
              </motion.p>)
            }
          </motion.p>
        </motion.div>
        <motion.button
          className=" border-none cursor-pointer text-xl flex items-center justify-center text-stone-800 dark:text-stone-700"
          whileHover={{ scale: 1.3 }}
          onClick={() => props.deleteNote(props.note.id)}
        >
          <MdDelete />
        </motion.button>
      </span>
      <div className="w-full h-full flex flex-col items-center gap-2">
        <ReactQuill
          theme="bubble"
          value={value}
          onChange={handleTextChange}
          modules={modules}
          className="w-full h-full text-lg custom-scroll"
        />
      </div>
      <div className="flex justify-between items-center py-2">
        <div className="self-start">
          <p className="text-sm p-2 text-stone-800 dark:text-stone-700">{formatDate(props.note.time)}</p>
        </div>
        <div className="flex items-center justify-center space-x-2 ">
          {aiLoading ? (
            <motion.p
              className="shimmer text-slate-600"
              animate={{
                width: aiLoading ? "170px" : "0px",
                opacity: 1,
              }}
              initial={{ width: "0px", opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              Generating Response...
            </motion.p>
          ) : (
            <motion.input
              type="text"
              placeholder="Ask the Chatbot"
              value={inputText}
              onChange={handleInputChange}
              className="px-3 text-sm py-2 rounded-lg border-none bg-slate-700 text-stone-200"
              animate={{
                width: isMobileScreen ? "150px" : aiLoading ? "0px" : isOpen ? "250px" : "0px",
                opacity: aiLoading ? 0 : isOpen ? 1 : 0,
              }}
              initial={{ width: "0px", opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: "linear",
              }}
              style={{ overflow: "hidden" }}
            />
          )}
          {inputText.trim() && !isListening ? (
            <motion.p
              className="text-4xl cursor-pointer text-stone-200 bg-black rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              exit={{ rotate: 360 }}
              animate={{
                opacity: isListening ? 0 : aiLoading ? 0 : isOpen ? 1 : 0,
              }}
              initial={{ opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              onClick={handleAIResponse}
            >
              <FaArrowCircleUp />
            </motion.p>
          ) : (
            <motion.p
              className="text-4xl cursor-pointer flex items-center justify-center relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              exit={{ rotate: 360 }}
              animate={{
                opacity: isListening ? 1 : isOpen ? 1 : 0,
              }}
              initial={{ opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              onClick={startListening}
            >
              <motion.p animate={{ opacity: isListening ? 1 : 0, y: 5 }} initial={{ opacity: 0, y: -10 }} transition={{ duration: 0.2, ease: "easeIn" }}
                className="absolute -top-5 text-stone-800 dark:stone-700 font-semibold text-xs"
              >
                {formatTime(speechTimer)}
              </motion.p>
              <IoMic style={{ color: isListening ? "red" : "#292524" }} />
            </motion.p>
          )}
          <div className="flex items-center justify-center relative">
            {aiError && <motion.p
              className="absolute bg-red-500 text-bold text-white rounded-lg p-3 cursor-pointer text-nowrap"
              animate={{
                opacity: aiError ? 1 : 0,
                y: aiError ? -50 : 0,
              }}
              initial={{
                opacity: 0,
                y: 20,
                x: -50,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              {aiError}
            </motion.p>
            }
            <motion.p
              className="cursor-pointer text-5xl text-stone-800 dark:text-stone-700" 
              whileHover={{ rotate: aiLoading ? 0 : 360, scale: 1.1 }}
              whileTap={{ scale: 0.9, rotate: aiLoading ? 0 : 360 }}
              animate={{
                fontSize: isOpen ? "40px" : "36px",
                rotateZ: isOpen ? 360 : 0,
                rotateY: aiLoading ? 360 : 0
              }}
              initial={{ fontSize: "36px" }}
              transition={{
                duration: aiLoading ? 1.5 : 0.5,
                ease: "linear",
                repeat: aiLoading ? Infinity : 0,
              }}
              onClick={toggleInput}
            >
              <PiOpenAiLogoBold />
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Note;
