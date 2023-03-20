import { useCycle, motion, AnimatePresence } from "framer-motion";

import { AdminHeader, Sidebar } from "components/modules";

import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const Admin = ({ children }: Props) => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="w-full h-screen"
    >
      {/* Navbar */}
      <AdminHeader isOpen={isOpen} toggleOpen={toggleOpen} />

      {/* Body */}
      <div className="relative w-full flex h-[92vh]">
        {/* Sidebar/Drawer */}
        <AnimatePresence>
          <Sidebar open={isOpen} />
        </AnimatePresence>

        {/* Content */}
        <div className="absolute right-0 w-5/6 md:w-11/12 lg:w-3/4 xl:w-4/5 h-full py-5 lg:py-10 px-3 md:px-5 lg:px-10 overflow-y-auto space-y-3 md:space-y-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Admin;
