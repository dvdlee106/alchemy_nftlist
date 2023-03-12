export type NFT = {
  image: string;
  title: string;
  tokenId: string;
  lastUpdated: string;
  floorPrice: number | undefined;
  description: string | undefined;
};

export type NFTInfo = {
  totalSupply: number;
  contractDeploy: string | undefined;
  tokenType: string;
  symbol: string | undefined;
  name: string | undefined;
  floorPrice: number | undefined;
  imageUrl: string | undefined;
  description: string | undefined;
  discordUrl: string | undefined;
  website: string | undefined;
};
