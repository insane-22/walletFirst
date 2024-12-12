import React, { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { ClipboardIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";

const Wallet = ({ solWalletLength, wallet, index }) => {
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast(`Copied ${text}`);
  };

  return (
    <motion.div
      key={index}
      className="p-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <h3 className="text-xl font-semibold mb-2">
        {index + 1 > solWalletLength ? (
          <>Ethereum Wallet {index + 1 - solWalletLength}</>
        ) : (
          <>Solana Wallet {index + 1}</>
        )}
      </h3>
      <div className="mt-7">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="lastAddress">Address</Label>
          <Input
            id="lastAddress"
            value={wallet[0]}
            readOnly
            type="text"
            showIcon={true}
            icon={
              <button
                onClick={() => copyToClipboard("wallet address")}
                className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                aria-label="Copy Address"
              >
                <ClipboardIcon className="h-5 w-5" />
              </button>
            }
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="lastPrivateKey">Private Key</Label>
          <Input
            id="lastPrivateKey"
            value={wallet[1]}
            readOnly
            type={showPrivateKey ? "text" : "password"}
            showIcon={true}
            icon={
              <div className="flex ">
                <button
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                  className="p-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                  aria-label={
                    showPrivateKey ? "Hide Private Key" : "Show Private Key"
                  }
                >
                  {showPrivateKey ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={() => copyToClipboard("Secret Key")}
                  className="p-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                  aria-label="Copy Private Key"
                >
                  <ClipboardIcon className="h-5 w-5" />
                </button>
              </div>
            }
          />
        </LabelInputContainer>
      </div>
    </motion.div>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};


export default Wallet;

