import React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

import type { NextPage } from "next";

type Props = {
  open: boolean;
};

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Drawer: NextPage<Props> = ({ open }) => {
  const { theme, setTheme } = useTheme();
  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <motion.div
      variants={variants}
      className={`${
        open ? "block" : "hidden"
      } absolute w-1/2 pt-10 h-screen top-20 left-0 bottom-0 z-20 bg-white dark:bg-dark-100`}
    >
      Drawer
      <div onClick={changeTheme}>change Theme</div>
    </motion.div>
  );
};

export default Drawer;
