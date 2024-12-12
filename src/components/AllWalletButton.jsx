import React, { useState } from "react";
import AllWallets from "./AllWallets";

const AllWalletButton = ({ solWalletLength, solWallets, etherWallets }) => {
  const [showWalletList, setShowWalletList] = useState(false);

  const handleButtonClick = () => {
    setShowWalletList(true);
  };

  return (
    <>
      <div className="relative">
        <button className="p-[3px] relative" onClick={handleButtonClick}>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            View All Wallets
          </div>
        </button>
      </div>
      <AllWallets
        solWalletLength={solWalletLength}
        wallets={[...solWallets, ...etherWallets]}
        isOpen={showWalletList}
        onClose={() => setShowWalletList(false)}
      />
    </>
  );
};

export default AllWalletButton;
