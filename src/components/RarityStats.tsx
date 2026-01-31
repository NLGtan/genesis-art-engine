import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RarityStatsProps {
  stats: Record<string, number>;
}

const rarities = [
  { name: "Common", chance: "70%", color: "text-muted-foreground" },
  { name: "Rare", chance: "20%", color: "text-rarity-rare" },
  { name: "Epic", chance: "8%", color: "text-rarity-epic" },
  { name: "Legendary", chance: "1.9%", color: "text-rarity-legendary" },
  { name: "Unique", chance: "0.1%", color: "rarity-unique" },
];

export function RarityStats({ stats }: RarityStatsProps) {
  const total = Object.values(stats).reduce((a, b) => a + b, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <h3 className="font-display text-sm tracking-wider text-muted-foreground mb-4 text-center">
        RARITY DISTRIBUTION
      </h3>
      
      <div className="glass rounded-xl p-4 space-y-3">
        {rarities.map((rarity, index) => {
          const count = stats[rarity.name] || 0;
          const percentage = total > 0 ? (count / total) * 100 : 0;
          
          return (
            <motion.div
              key={rarity.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center gap-3"
            >
              <span className={cn("font-display text-xs w-20", rarity.color)}>
                {rarity.name.toUpperCase()}
              </span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, delay: 0.2 + 0.1 * index }}
                  className={cn(
                    "h-full rounded-full",
                    rarity.name === "Common" && "bg-muted-foreground/50",
                    rarity.name === "Rare" && "bg-rarity-rare",
                    rarity.name === "Epic" && "bg-rarity-epic",
                    rarity.name === "Legendary" && "bg-rarity-legendary",
                    rarity.name === "Unique" && "bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
                  )}
                />
              </div>
              <span className="text-xs text-muted-foreground font-mono w-8 text-right">
                {count}
              </span>
              <span className="text-xs text-muted-foreground/50 w-12 text-right">
                {rarity.chance}
              </span>
            </motion.div>
          );
        })}
      </div>
      
      {total > 0 && (
        <p className="text-center text-xs text-muted-foreground mt-3">
          Total minted: <span className="text-primary font-display">{total}</span>
        </p>
      )}
    </motion.div>
  );
}
