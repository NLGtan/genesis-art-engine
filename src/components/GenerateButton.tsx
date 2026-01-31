import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface GenerateButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function GenerateButton({ onClick, isLoading, disabled }: GenerateButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        "relative group w-full max-w-md mx-auto",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
      
      {/* Button */}
      <div className="relative px-8 py-4 bg-gradient-primary rounded-xl flex items-center justify-center gap-3 overflow-hidden">
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        <Sparkles className={cn(
          "w-5 h-5 text-primary-foreground",
          isLoading && "animate-spin"
        )} />
        <span className="font-display text-lg tracking-wider text-primary-foreground">
          {isLoading ? "GENERATING..." : "MINT NFT"}
        </span>
      </div>
    </motion.button>
  );
}
