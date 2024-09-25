import React from "react";
import { motion } from "framer-motion";

function LatestProjectCards({ item }) {
  if (!item) return null; // Return null if no item is passed

  return (
    <motion.div
      className="card items-center flex align-middle justify-center"
      initial={{ y: -20, opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="w-[200px] h-[160px] md:w-[300px] md:h-[280px] bg-blue-950 rounded-xl p-5 grid items-end"
        style={{
          backgroundImage: `url(${item.image || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          {item.title_1 && (
            <div
              className="mb-3 font-bold text-xl md:text-2xl text-black rounded-lg"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                WebkitBackdropFilter: "blur(1px)",
                backdropFilter: "blur(1px)",
                padding: "2px",
              }}
            >
              {item.title_1}
            </div>
          )}
          {item.description && (
            <div
              className="hidden md:flex text-black rounded-lg max-h-20 overflow-hidden text-ellipsis line-clamp-2"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                WebkitBackdropFilter: "blur(1px)",
                backdropFilter: "blur(1px)",
                padding: "2px",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {item.description}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default LatestProjectCards;
