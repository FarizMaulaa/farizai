import { useState } from "react";
import Lottie from "./Lottie";
import { BiSun, BiMoon } from "react-icons/bi";
import Index from "./Index";
import Footer from "./Footer";

const Navbar = () => {
  const [dark, setDark] = useState(false);

  const handleDrakMode = () => {
    setDark(!dark);
    const body = document.body;
    body.classList.toggle("dark");
  };
  return (
    <>
      <div className="w-full h-screen bg-white dark:bg-slate-800 dark:text-white">
        <div className="flex justify-between px-10 py-8">
          <div>
            <div className="flex justify-start">
              <Lottie />
            </div>
            <h1 className="text-2xl -mt-4 ml-2.5 font-bold">
              Fariz <span className="text-green-500">A</span>
              <span className="text-green-600">I</span>
            </h1>
            <p className=" ml-2.5 text-gray-400">
              FarizAI Adalah Teknologi Kecerdasan Buatan (AI). By FarizMaulana
            </p>
          </div>
          <div>
            <button onClick={handleDrakMode} className="text-2xl text-gray-400">
              {dark ? <BiSun /> : <BiMoon />}
            </button>
          </div>
        </div>
        <Index />
        <Footer />
      </div>
    </>
  );
};

export default Navbar;

// "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",
