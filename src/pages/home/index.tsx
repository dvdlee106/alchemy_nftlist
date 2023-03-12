import { useEffect, useState } from "react";
import Item from "../../components/item";
import DetailModal from "../../components/modal";
import Pagination from "../../components/pagination";
import Search from "../../components/search";
import alchemyApis from "../../services/apis";
import { addressRegex } from "../../services/constant";
import { NFT, NFTInfo } from "../../services/types";

import styles from "./home.module.css";

const Home = () => {
  const [address, setAddress] = useState("");
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [collectionInfo, setCollectionInfo] = useState<NFTInfo>();
  const [pageSize, setPageSize] = useState(10);

  const displayDetails = (nft: NFT) => {
    setSelectedNFT(nft);
    setIsOpenModal(true);
  };

  const hideModal = () => {
    setIsOpenModal(false);
    setSelectedNFT(null);
  };

  const updateAddress = (newAddress: string) => {
    setAddress(newAddress);
  };

  useEffect(() => {
    if (addressRegex.test(address)) {
      alchemyApis
        .getNftCollectionInfo(address)
        .then((res) => setCollectionInfo(res));
    }
  }, [address]);

  useEffect(() => {
    setTotalPage(
      collectionInfo?.totalSupply
        ? Math.ceil(collectionInfo.totalSupply / pageSize)
        : 0
    );
    setCurrentPage(1);
  }, [collectionInfo, pageSize]);

  useEffect(() => {
    console.log(addressRegex.test(address));
    if (addressRegex.test(address)) {
      alchemyApis
        .getNfts(address, (currentPage - 1) * pageSize, pageSize)
        .then((res) => setNfts(res));
    }
  }, [address, currentPage]);

  return (
    <div className={styles.home}>
      <Search address={address} setAddress={updateAddress} />
      <div className={styles.nftList}>
        <div className={styles.container}>
          <div
            className={`${styles.header} ${
              collectionInfo ? "" : styles.hidden
            }`}
          >
            <img src={collectionInfo?.imageUrl} alt="collection avatar" />
            <h1
              className={styles.name}
            >{`${collectionInfo?.name} (${collectionInfo?.tokenType})`}</h1>
          </div>
          <div className={styles.list}>
            {nfts.map((nft) => (
              <Item
                data={nft}
                showModal={displayDetails}
                key={`NFT-${Math.random() * Date.now()}`}
              />
            ))}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onSelectPage={(page) =>
            setCurrentPage(page > totalPage ? totalPage : page < 0 ? 1 : page)
          }
        />
      </div>
      {isOpenModal && (
        <DetailModal address={address} data={selectedNFT} onClose={hideModal} />
      )}
    </div>
  );
};

export default Home;
