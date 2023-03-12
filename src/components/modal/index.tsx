import { Link } from "react-router-dom";
import { NFT } from "../../services/types";
import styles from "./modal.module.css";

type ModalProps = {
  address: string;
  data: NFT | null;
  onClose: () => void;
};

const DetailModal = ({ address, data, onClose }: ModalProps) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container}>
        <div className={styles.content}>
          <img
            src={data ? data.image : undefined}
            alt="NFT"
            className={styles.image}
          />
        </div>
        <div className={styles.detail}>
          <h3>{data?.title}</h3>
          <p>{data?.lastUpdated}</p>
          <p>{data?.floorPrice} ETH</p>
          <p>{data?.description}</p>
          <Link
            to={`https://opensea.io/assets/ethereum/${address}/${data?.tokenId}`}
            target="_blank"
          >
            Go To OpenSea
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
