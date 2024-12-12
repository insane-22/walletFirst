import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Wallet from "./Wallet";

const AllWallets = ({ solWalletLength, wallets, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/70"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-3xl w-11/12 h-5/6 overflow-y-auto relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-4xl font-bold mb-6 text-center text-gradient bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
              Your Wallets
            </h2>
            <motion.div
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 },
                },
              }}
            >
              {Array.isArray(wallets) &&
                wallets.map((wallet, index) => (
                  <Wallet
                    solWalletLength={solWalletLength}
                    wallet={wallet}
                    index={index}
                    key={index}
                  />
                ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AllWallets;
