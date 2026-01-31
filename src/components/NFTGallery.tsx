import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NFT {
  id: string;
  imageUrl: string;
  rarity: string;
  edition: string;
}

interface NFTGalleryProps {
  nfts: NFT[];
}

const rarityBorder: Record<string, string> = {
  Common: "border-muted-foreground/30",
  Rare: "border-rarity-rare",
  Epic: "border-rarity-epic",
  Legendary: "border-rarity-legendary",
  Unique: "border-pink-500",
};

export function NFTGallery({ nfts }: NFTGalleryProps) {
  if (nfts.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      <h3 className="font-display text-sm tracking-wider text-muted-foreground mb-4 text-center">
        YOUR COLLECTION
      </h3>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        <AnimatePresence mode="popLayout">
          {nfts.slice().reverse().map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer group",
                rarityBorder[nft.rarity] || rarityBorder.Common
              )}
            >
              <img 
                src={nft.imageUrl} 
                alt={`NFT ${nft.edition}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                <span className="text-[10px] font-display text-foreground truncate">
                  #{nft.edition.slice(0, 6)}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
