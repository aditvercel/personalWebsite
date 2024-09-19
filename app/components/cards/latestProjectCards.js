import React from "react";
import { motion } from "framer-motion";

function LatestProjectCards({ item, ...props }) {
  const datas = [
    { image: "https://picsum.photos/200?random=1", title: "Title 1" },
    { image: "https://picsum.photos/200?random=2", title: "Title 2" },
    { image: "https://picsum.photos/200?random=3", title: "Title 3" },
    { image: "https://picsum.photos/200?random=4", title: "Title 4" },
    { image: "https://picsum.photos/200?random=5", title: "Title 5" },
    { image: "https://picsum.photos/200?random=6", title: "Title 6" },
    { image: "https://picsum.photos/200?random=7", title: "Title 7" },
    // Add more items as needed
  ];
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
        <div
          className="w-[200px] h-[160px] md:w-[300px] md:h-[280px] bg-blue-950 rounded-xl p-5 grid items-end"
          style={{
            backgroundImage: `url(${props.image ?? datas[0].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            {props.title && (
              <div
                className="mb-3 font-bold text-xl md:text-2xl text-black rounded-lg"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.4)",
                  webkitBackdropFilter: "blur(1px)",
                  backdropFilter: "blur(1px)",
                  padding: "2px",
                }}
              >
                {props.title}
              </div>
            )}
            {props.description && (
              <div
                className="hidden md:flex text-black rounded-lg max-h-20 overflow-hidden text-ellipsis line-clamp-2"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.4)",
                  webkitBackdropFilter: "blur(1px)",
                  backdropFilter: "blur(1px)",
                  padding: "2px",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
              >
                {props.description}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default LatestProjectCards;
