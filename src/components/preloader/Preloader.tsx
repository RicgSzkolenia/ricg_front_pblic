import "./preloader.scss";
import { motion } from "framer-motion";

const Preloader = () => {
  return (
    <motion.div className="preloader"
      animate={{ opacity: 0 }}
      transition={{ delay: 1.5, duration: 1 }}
    >
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={{
          scale: 1,
          opacity: 0.2,
          borderRadius: 0,
          height: "100vh",
          width: "100%",
          left: 0,
          top: 0,
        }}
        transition={{ delay: 1.5, duration: 1 }}
        className="preloader-circle"
      ></motion.div>
      <motion.img
        initial={{ scale: 1 }}
        animate={{ scale: 1, y: "-100vh", x: 0 }}
        transition={{ delay: 1, duration: 3.4 }}
        src={"./rocketPreloader.svg"}
      ></motion.img>
    </motion.div>
  );
};

export default Preloader;
