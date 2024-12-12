"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { ClipboardIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";
import { HDNodeWallet, Wallet } from "ethers";

export function EthCard({
  seed,
  ethIdx,
  setEthIdx,
  ethWallets,
  setEthWallets,
}) {
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const generateWallet = async () => {
    const path = `m/44'/60'/${ethIdx}'/0/0`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const derivedNode = hdNode.derivePath(path);

    const privateKey = derivedNode.privateKey;
    const publicKey = new Wallet(privateKey).address;
    const newWallet = [publicKey, privateKey];
    setEthIdx(ethIdx + 1);

    setEthWallets([newWallet, ...ethWallets]);
    setWalletAddress(newWallet[0]);
    setPrivateKey(newWallet[1]);

    toast(`Generated Ethereum Wallet ${ethWallets.length + 1}`);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast(`Copied ${text}`);
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <p className="text-2xl font-bold relative dark:text-white text-black">
        Ethereum Wallet
      </p>

      {ethWallets.length > 0 && (
        <div className="mt-7">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="lastAddress">Address</Label>
            <Input
              id="lastAddress"
              value={walletAddress}
              readOnly
              type="text"
              showIcon={true}
              icon={
                <button
                  onClick={() => copyToClipboard(walletAddress)}
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
              value={privateKey}
              readOnly
              type={showPrivateKey ? "text" : "password"}
              showIcon={true}
              icon={
                <div className="flex ">
                  <button
                    onClick={() => setShowPrivateKey(!showPrivateKey)}
                    className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
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
                    onClick={() => copyToClipboard(privateKey)}
                    className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                    aria-label="Copy Private Key"
                  >
                    <ClipboardIcon className="h-5 w-5" />
                  </button>
                </div>
              }
            />
          </LabelInputContainer>
        </div>
      )}

      <button
        className="mt-4 bg-gradient-to-br relative group/btn from-yellow-500 to-yellow-600 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        onClick={generateWallet}
      >
        Generate Wallet &rarr;
        <BottomGradient />
      </button>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-yellow-300 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
