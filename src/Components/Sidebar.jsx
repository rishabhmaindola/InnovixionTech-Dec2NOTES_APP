import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoSettings } from "react-icons/io5";
import { BiSolidPlusCircle } from "react-icons/bi";
import { MdSummarize } from "react-icons/md";
import Moon from "../animations/Moon";
import Sun from "../animations/Sun";

function Sidebar(props) {
  const colors = ["#00d4fe", "#fe9b72", "#fec971", "#b693fd", "#e4ee91"];
  const darkColors = ["#007aa3", "#cc6a4e", "#b5853f", "	#7a5bb3", "#a8b45e"];

  const [listOpen, setListOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedPreference = localStorage.getItem('theme');
    return storedPreference === 'dark';
  });

  const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

  }, [isDarkMode]);


  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <div className="flex flex-row xs:flex-row sm:flex-row lg:flex-col xl:flex-col items-center pt-0 xs:pt-0 sm:pt-0 md:pt-0 lg:pt-2 xl:pt-2 pl-0 lg:pl-1 xl:pl-1 gap-2 ">
      <motion.p
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5, ease: "easeOut" },
        }}
        className="flex w-14 text-5xl items-center justify-center  cursor-pointer text-zinc-800 dark:text-stone-100"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setListOpen(!listOpen)}
      >
        <BiSolidPlusCircle />
      </motion.p>

      <motion.ul
        initial={{
          opacity: 0,
          height: isLargeScreen ? 0 : "auto",
          width: isLargeScreen ? "auto" : 0,
        }}
        animate={{
          opacity: listOpen ? 1 : 0,
          height: listOpen && isLargeScreen ? "200px" : 0,
          width: listOpen && !isLargeScreen ? "200px" : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={`flex ${isLargeScreen ? "flex-col" : "flex-row"} gap-5 items-center ${listOpen ? "overflow-visible" : "overflow-hidden"
          }`}
      >
        {(isDarkMode ? darkColors : colors).map((item, index) => (
          <motion.li
            whileTap={{ scale: 0.9 }}
            key={index}
            className="rounded-full h-6 w-6 list-none cursor-pointer"
            style={{ backgroundColor: item }}
            onClick={() => props.addNote(item)}
          />
        ))}
      </motion.ul>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 1, ease: "easeOut" },
        }}
        className="w-10 xs:text-3xl sm:text-3xl text-3xl lg:text-5xl xl:text-5xl flex items-center justify-center cursor-pointer pt-2  text-yellow-200 dark:text-stone-100"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMode}
      >
        {isDarkMode ? <Moon/> : <Sun/>}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, x: -50 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        }}
        className="w-10 pt-2 xs:text-2xl text-2xl sm:text-2xl lg:text-3xl xl:text-3xl flex items-center justify-center cursor-pointer text-zinc-800 dark:text-stone-100"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <MdSummarize />
      </motion.p>
      <motion.a
        initial={{ opacity: 0, x: -50 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        }}
        whileHover={{ rotate: 10, scale: 1.1 }}
        whileTap={{ scale: 0.9, }}
        transition={{ duration: 0.2 }}
        href="/settings"
        className="w-10 pt-2 xs:text-2xl text-2xl sm:text-2xl lg:text-3xl xl:text-3xl flex items-center justify-center text-zinc-800 dark:text-stone-100"
      >
        <IoSettings />
      </motion.a>
    </div>
  );
}

export default Sidebar;