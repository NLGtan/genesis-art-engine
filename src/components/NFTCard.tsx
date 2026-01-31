import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NFTCardProps {
  imageUrl?: string;
  rarity?: string;
  edition?: string;
  isLoading?: boolean;
  isEmpty?: boolean;
}

const rarityStyles: Record<string, string> = {
  Common: "rarity-common border-muted-foreground/30",
  Rare: "rarity-rare border-rarity-rare shadow-[0_0_30px_hsl(210,100%,60%,0.3)]",
  Epic: "rarity-epic border-rarity-epic shadow-[0_0_40px_hsl(280,100%,65%,0.4)]",
  Legendary: "rarity-legendary border-rarity-legendary shadow-[0_0_50px_hsl(40,100%,55%,0.5)]",
  Unique: "border-transparent shadow-[0_0_60px_hsl(300,100%,60%,0.4)]",
};

const rarityBadgeStyles: Record<string, string> = {
  Common: "bg-muted text-muted-foreground",
  Rare: "bg-rarity-rare/20 text-rarity-rare border border-rarity-rare/50",
  Epic: "bg-rarity-epic/20 text-rarity-epic border border-rarity-epic/50",
  Legendary: "bg-rarity-legendary/20 text-rarity-legendary border border-rarity-legendary/50",
  Unique: "bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white",
};

export function NFTCard({ imageUrl, rarity = "Common", edition, isLoading, isEmpty }: NFTCardProps) {
  if (isEmpty) {
    return (
      <div className="relative aspect-square w-full max-w-md mx-auto">
        <div className="absolute inset-0 rounded-2xl bg-gradient-card border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center gap-4">
          <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center">
            <svg className="w-10 h-10 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-muted-foreground/60 font-display text-sm tracking-wider">YOUR NFT AWAITS</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="relative aspect-square w-full max-w-md mx-auto">
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          {/* Spinning border */}
          <div className="absolute inset-0 animate-border-spin">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl" />
          </div>
          <div className="absolute inset-[3px] rounded-2xl bg-card flex flex-col items-center justify-center gap-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <div className="absolute inset-2 w-12 h-12 border-4 border-secondary/20 border-b-secondary rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            </div>
            <div className="text-center">
              <p className="font-display text-lg text-primary animate-pulse">GENERATING</p>
              <p className="text-muted-foreground text-sm mt-1">Rolling for rarity...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative aspect-square w-full max-w-md mx-auto"
    >
      {/* Unique rarity rainbow border */}
      {rarity === "Unique" && (
        <div className="absolute inset-0 rounded-2xl animate-border-spin" style={{ animationDuration: '4s' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 to-purple-500 rounded-2xl" />
        </div>
      )}
      
      <div className={cn(
        "absolute inset-[3px] rounded-2xl overflow-hidden border-2 transition-all duration-300",
        rarityStyles[rarity] || rarityStyles.Common
      )}>
        {/* Image */}
        <img 
          src={imageUrl} 
          alt={`NFT ${edition}`}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        
        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-display tracking-wider">EDITION</p>
              <p className="font-display text-lg text-foreground">#{edition?.slice(0, 8) || "000000"}</p>
            </div>
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-display tracking-wider",
              rarityBadgeStyles[rarity] || rarityBadgeStyles.Common,
              rarity === "Unique" && "rarity-unique"
            )}>
              {rarity.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
