import React from "react";
import { motion } from "framer-motion";

function LatestProjectCards({ item, ...props }) {
  return (
    <>
      <motion.div
        {...props}
        className="card items-center flex align-middle justify-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-[170px] h-[160px] md:w-[300px] md:h-[280px] bg-red-500 rounded-xl">
          {item.category}
        </div>
      </motion.div>
    </>
  );
}

export default LatestProjectCards;
