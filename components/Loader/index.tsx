import React from "react";

const Loader = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-200">
      <div className="w-16 h-16 border-b-2 border-primary border-dotted rounded-full animate-spin" />
    </div>
  );
};

export default Loader;
