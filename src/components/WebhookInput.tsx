import { useState } from "react";
import { motion } from "framer-motion";
import { Link2, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WebhookInputProps {
  value: string;
  onChange: (value: string) => void;
  isConnected?: boolean;
  error?: string;
}

export function WebhookInput({ value, onChange, isConnected, error }: WebhookInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <label className="block text-sm font-display tracking-wider text-muted-foreground mb-2">
        N8N WEBHOOK URL
      </label>
      <div className={cn(
        "relative rounded-xl transition-all duration-300",
        isFocused && "shadow-neon"
      )}>
        {/* Glow border on focus */}
        {isFocused && (
          <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-sm opacity-50" />
        )}
        
        <div className="relative flex items-center bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-4 py-3 border-r border-border bg-muted/30">
            <Link2 className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="https://your-n8n.app/webhook/..."
            className="flex-1 px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none font-mono text-sm"
          />
          {isConnected && (
            <div className="px-4">
              <Check className="w-5 h-5 text-green-500" />
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mt-2 text-destructive text-sm"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </motion.div>
      )}
      
      <p className="text-xs text-muted-foreground/60 mt-2">
        Enter your n8n workflow webhook URL to generate NFTs
      </p>
    </motion.div>
  );
}
