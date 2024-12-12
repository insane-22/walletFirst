import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Swal from "sweetalert2";
import { ChevronDown, ChevronUp, Copy, Eraser } from "lucide-react";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { SolanaCard } from "./SolanaCard";
import { EthCard } from "./EthCard";
import AllWalletButton from "./AllWalletButton";

const GenerateSecret = () => {
  const [mnemonicWords, setMnemonicWords] = useState(Array(12).fill(" "));
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [solIdx, setSolIdx] = useState(0);
  const [ethIdx, setEthIdx] = useState(0);
  const [solWallets, setSolWallets] = useState([]);
  const [ethWallets, setEthWallets] = useState([]);

  const handleGenerateSecret = () => {
    let mnemonic = generateMnemonic();
    const words = mnemonic.split(" ");
    setMnemonicWords(words);
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Share With Caution!",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  const removeSecret = () => {
    setMnemonicWords(Array(12).fill(" "));
    setShowMnemonic(false);
  };

  const toastMixin = Swal.mixin({
    toast: true,
    icon: "success",
    title: "General Title",
    animation: false,
    position: "bottom-right",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
    toastMixin.fire({
      animation: true,
      title: "Copied to Clipboard",
    });
  };

  return (
    <>
      {mnemonicWords[0] == " " && (
        <div className="flex justify-center">
          <Button
            onClick={() => handleGenerateSecret()}
            size="lg"
            variant="destructive"
          >
            Generate Secret Key
          </Button>
        </div>
      )}
      {mnemonicWords[0] != " " && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="group flex flex-col items-center gap-4 cursor-pointer rounded-lg border border-primary/10 p-8"
        >
          <div
            className="flex w-full justify-between items-center"
            onClick={() => setShowMnemonic(!showMnemonic)}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">
              Your Secret Phrase
            </h2>
            <Button
              onClick={() => setShowMnemonic(!showMnemonic)}
              variant="ghost"
            >
              {showMnemonic ? (
                <ChevronUp className="size-4" />
              ) : (
                <ChevronDown className="size-4" />
              )}
            </Button>
          </div>

          {showMnemonic && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="flex flex-col w-full items-center justify-center"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center w-full items-center mx-auto my-8"
              >
                {mnemonicWords.map((word, index) => (
                  <p
                    key={index}
                    className="md:text-lg bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 rounded-lg p-4"
                  >
                    {word}
                  </p>
                ))}
              </motion.div>
              <div className="flex justify-between w-full">
                <div
                  className="text-sm md:text-base text-primary/50 flex gap-2 items-center group-hover:text-primary/80 transition-all duration-300"
                  onClick={() => copyToClipboard(mnemonicWords.join(" "))}
                >
                  <Copy className="size-4" /> Copy Secret Key
                </div>
                <div
                  className="text-sm md:text-base text-destructive/80 flex gap-2 items-center"
                  onClick={removeSecret}
                >
                  <Eraser className="size-4" /> Remove Secret Key
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {mnemonicWords[0] != " " && (
        <>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="group flex items-center justify-around cursor-pointer rounded-lg "
            //border border-primary/10 p-8
          >
            <SolanaCard
              seed={mnemonicToSeedSync(mnemonicWords.join(" "))}
              solIdx={solIdx}
              setSolIdx={setSolIdx}
              solWallets={solWallets}
              setSolWallets={setSolWallets}
            />
            <EthCard
              seed={mnemonicToSeedSync(mnemonicWords.join(" "))}
              ethIdx={ethIdx}
              setEthIdx={setEthIdx}
              ethWallets={ethWallets}
              setEthWallets={setEthWallets}
            />
          </motion.div>

          {(solIdx > 0 || ethIdx > 0) && (
            <div className="group flex items-center justify-around cursor-pointer mt-5">
              <AllWalletButton
                solWalletLength={solIdx}
                solWallets={solWallets}
                etherWallets={ethWallets}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default GenerateSecret;
