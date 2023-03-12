import { Alchemy, Network } from "alchemy-sdk";
import { NFT, NFTInfo } from "./types";

class AlchemyApis {
  private alchemy: Alchemy;
  private config = {
    apiKey: process.env.REACT_APP_ALCHEMY_KEY,
    network: Network.ETH_MAINNET,
  };

  constructor() {
    this.alchemy = new Alchemy(this.config);
  }

  async getNftCollectionInfo(address: string): Promise<NFTInfo> {
    const metadata = await this.alchemy.nft.getContractMetadata(address);
    return {
      totalSupply: parseInt(metadata.totalSupply || "0"),
      contractDeploy: metadata.contractDeployer,
      tokenType: metadata.tokenType,
      symbol: metadata.symbol,
      name: metadata.name,
      floorPrice: metadata.openSea?.floorPrice,
      imageUrl: metadata.openSea?.imageUrl,
      description: metadata.openSea?.description,
      discordUrl: metadata.openSea?.discordUrl,
      website: metadata.openSea?.externalUrl,
    };
  }

  async getNfts(
    address: string,
    start: number,
    amount: number
  ): Promise<NFT[]> {
    const nftsData = await this.alchemy.nft.getNftsForContract(address, {
      pageKey: start.toString(),
      pageSize: amount,
    });
    console.log(nftsData);
    const nfts: NFT[] = nftsData.nfts.map((nft) => ({
      image: nft.media[0]?.thumbnail || nft.media[0].raw,
      title: nft.title,
      tokenId: nft.tokenId,
      tokenType: nft.tokenType,
      lastUpdated: nft.timeLastUpdated,
      floorPrice: nft.contract.openSea?.floorPrice,
      description: nft.rawMetadata?.description,
    }));
    return nfts;
  }
}

const alchemyApis = new AlchemyApis();
export default alchemyApis;
