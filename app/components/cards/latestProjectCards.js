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
        <div className="w-[200px] h-[160px] md:w-[300px] md:h-[280px] bg-blue-950 rounded-xl p-5 grid items-end">
          <div>
            <div className="mb-3 font-bold text-xl md:text-2xl">Item title</div>
            <div className=" hidden md:flex">
              In et non laborum aute laborum. Qui non amet ad Lorem id anim
              culpa pariatur nisi Lorem. Eu irure mollit do aliquip ea nulla
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default LatestProjectCards;
