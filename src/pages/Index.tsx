import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Hexagon, Zap, Download } from "lucide-react";
import { NFTCard } from "@/components/NFTCard";
import { GenerateButton } from "@/components/GenerateButton";
import { WebhookInput } from "@/components/WebhookInput";
import { RarityStats } from "@/components/RarityStats";
import { NFTGallery } from "@/components/NFTGallery";
import { useToast } from "@/hooks/use-toast";

interface NFT {
  id: string;
  imageUrl: string;
  rarity: string;
  edition: string;
}

const Index = () => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentNFT, setCurrentNFT] = useState<NFT | null>(null);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [error, setError] = useState("");
  const { toast } = useToast();

  const generateNFT = useCallback(async () => {
    if (!webhookUrl) {
      setError("Please enter your n8n webhook URL");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle the response from n8n
      // Expected format: { images: ["base64..."], rarity: "Common", edition: "..." }
      const imageBase64 = data.images?.[0] || data.image;
      const rarity = data.rarity || "Common";
      const edition = data.edition || Date.now().toString();

      if (!imageBase64) {
        throw new Error("No image received from webhook");
      }

      const imageUrl = imageBase64.startsWith("data:") 
        ? imageBase64 
        : `data:image/png;base64,${imageBase64}`;

      const newNFT: NFT = {
        id: `${edition}-${Date.now()}`,
        imageUrl,
        rarity,
        edition,
      };

      setCurrentNFT(newNFT);
      setNfts(prev => [...prev, newNFT]);
      setStats(prev => ({
        ...prev,
        [rarity]: (prev[rarity] || 0) + 1,
      }));

      toast({
        title: `${rarity} NFT Minted!`,
        description: `Edition #${edition.slice(0, 8)}`,
      });

    } catch (err) {
      console.error("Error generating NFT:", err);
      setError(err instanceof Error ? err.message : "Failed to generate NFT");
      toast({
        title: "Generation Failed",
        description: "Check your webhook URL and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [webhookUrl, toast]);

  const downloadNFT = useCallback(() => {
    if (!currentNFT) return;
    
    const link = document.createElement("a");
    link.href = currentNFT.imageUrl;
    link.download = `${currentNFT.edition}_${currentNFT.rarity}.png`;
    link.click();
  }, [currentNFT]);

  return (
    <div className="min-h-screen bg-background grid-pattern relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Hexagon className="w-10 h-10 text-primary animate-pulse-glow" />
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient tracking-wider">
              NFT FORGE
            </h1>
            <Zap className="w-10 h-10 text-secondary animate-pulse-glow" />
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">
            Generate unique AI-powered NFT artwork with rarity tiers.
            Connect your n8n workflow to start minting.
          </p>
        </motion.header>

        {/* Main content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Webhook input */}
          <WebhookInput
            value={webhookUrl}
            onChange={setWebhookUrl}
            isConnected={!!webhookUrl && !error}
            error={error}
          />

          {/* NFT Display */}
          <div className="py-8">
            <NFTCard
              imageUrl={currentNFT?.imageUrl}
              rarity={currentNFT?.rarity}
              edition={currentNFT?.edition}
              isLoading={isLoading}
              isEmpty={!currentNFT && !isLoading}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GenerateButton
              onClick={generateNFT}
              isLoading={isLoading}
              disabled={!webhookUrl}
            />
            
            {currentNFT && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={downloadNFT}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-muted/50 transition-colors font-display text-sm tracking-wider"
              >
                <Download className="w-4 h-4" />
                DOWNLOAD
              </motion.button>
            )}
          </div>

          {/* Stats */}
          <div className="pt-8">
            <RarityStats stats={stats} />
          </div>

          {/* Gallery */}
          {nfts.length > 0 && (
            <div className="pt-8">
              <NFTGallery nfts={nfts} />
            </div>
          )}
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 text-muted-foreground/40 text-sm"
        >
          <p>Powered by n8n workflows & AI image generation</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
