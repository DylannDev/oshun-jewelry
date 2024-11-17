import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-3 h-full pt-8">
      <div className="w-8 h-8 border-8 border-black border-b-transparent rounded-full animate-spin"></div>
      <p className="font-medium">Chargement...</p>
    </div>
  );
};

export default Loader;
