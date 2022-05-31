import { FunctionComponent } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

type MenuProp = {
  toggle: Function;
};

type PathProp = {
  d?: string;
  variants: {
    closed: {
      d?: string;
      opacity?: number;
    };
    open: {
      d?: string;
      opacity?: number;
    };
  };
  transition?: {
    duration: number;
  };
};

const Path: FunctionComponent<PathProp> = (props) => {
  const { theme } = useTheme();
  return (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke={`${theme === "light" ? "hsl(0, 0%, 18%)" : "hsl(0, 25%, 95%)"}`}
      strokeLinecap="round"
      {...props}
    />
  );
};

const Menu: FunctionComponent<MenuProp> = ({ toggle }) => (
  <button className="md:hidden" onClick={() => toggle()}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);

export default Menu;
