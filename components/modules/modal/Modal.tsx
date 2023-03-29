import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

import { fadeInUp, stagger } from "variants";
import { useNoScroll } from "hooks";

import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
};

const Modal = ({ id, title, children, size = "md" }: Props) => {
  // useNoScroll();
  const getSize = () => {
    switch (size) {
      case "sm":
        return "w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4";
      case "md":
        return "w-full md:w-1/2 lg:w-1/3";
      case "lg":
        return "w-full md:w-2/3";
      default:
        return "";
    }
  };

  const toggle = () => {
    document.getElementById(`${id}-modal-toggle`)?.classList.toggle("hidden");
    document.getElementById(`${id}-modal-toggle`)?.classList.toggle("block");
  };

  const close = () => {
    document.getElementById(`${id}-modal`)?.classList.toggle("hidden");
  };

  return (
    <div
      id={`${id}-modal`}
      className="w-full h-full p-5 fixed inset-0 z-20 hidden"
    >
      <div onClick={close} className="fixed inset-0 bg-dark/50" />
      <motion.div
        variants={stagger}
        className="w-full h-full flex justify-center items-center"
      >
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className={`${getSize()} relative h-fit flex flex-col gap-5 bg-white p-5 rounded-3xl`}
        >
          <div className="w-full flex items-center justify-between">
            <h2 className="text-xl font-medium">{title}</h2>

            <button onClick={close}>
              <FaTimes className="w-4 h-4 text-error" />
            </button>
          </div>
          <div className="w-full inline-flex flex-col gap-3">{children}</div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Modal;
