import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { ClipboardIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import { Buffer } from "buffer";
import { derivePath } from "ed25519-hd-key";

export function SolanaCard({ seed, solIdx, setSolIdx,solWallets,setSolWallets }) {
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const generateWallet = () => {
    const path = `m/44'/501'/${solIdx}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;

    const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
    const keypair = Keypair.fromSecretKey(secretKey);

    const privateKey = Buffer.from(keypair.secretKey).toString("hex");
    const publicKey = keypair.publicKey.toBase58();
    const newWallet = [publicKey, privateKey];
    setSolIdx(solIdx + 1);

    setSolWallets([newWallet, ...solWallets]);
    setWalletAddress(newWallet[0]);
    setPrivateKey(newWallet[1]);

    toast(`Generated Solana Wallet ${solWallets.length + 1}`);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast(`Copied: ${text}`);
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <p className="text-2xl font-bold relative dark:text-white text-black">Solana Wallet</p>

      {solWallets.length > 0 && (
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
                  onClick={() => copyToClipboard(wallets[0].address)}
                  className=" text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
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
                    onClick={() => copyToClipboard(wallets[0].privateKey)}
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
      )}

      <button
        className="mt-4 bg-gradient-to-br from-green-500 to-green-600 w-full text-white rounded-md h-10 font-medium"
        onClick={generateWallet}
      >
        Generate Wallet &rarr;
      </button>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
    </div>
  );
}

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
