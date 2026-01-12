import React, { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <motion.div 
      whileTap={{ scale: 0.9, rotate: 15 }} 
      className="flex items-center justify-center"
    >
      <label className="swap swap-rotate cursor-pointer">
        {/* this hidden checkbox controls the state */}
        <input
          type="checkbox"
          className="hidden"
          onChange={toggleTheme}
          checked={theme === "dark"}
        />

        {/* Moon Icon: Visible when 'checked' (Dark Mode) */}
        <FiMoon 
          className={`swap-on w-6 h-6 md:w-7 md:h-7 transition-colors duration-300 ${
            theme === "dark" ? "text-yellow-400" : "text-slate-700"
          }`} 
        />

        {/* Sun Icon: Visible when 'unchecked' (Light Mode) */}
        <FiSun 
          className={`swap-off w-6 h-6 md:w-7 md:h-7 transition-colors duration-300 ${
            theme === "light" ? "text-orange-500" : "text-slate-400"
          }`} 
        />
      </label>
    </motion.div>
  );
}