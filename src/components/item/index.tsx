import { Link } from "react-router-dom";
import { IconEthereum } from "../../services/icons";
import { NFT } from "../../services/types";

import styles from "./item.module.css";

type ItemProps = {
  data: NFT;
  showModal: (data: NFT) => void;
};

const Item = ({ data, showModal }: ItemProps) => {
  return (
    <div
      className={styles.item}
      onClick={() => {
        showModal(data);
      }}
    >
      <img src={data.image} />
      <div className={styles.info}>
        <div className={styles.titleBlock}>
          <h3>{data.title}</h3>
          <span className={styles.tokenId}>{`#${data.tokenId}`}</span>
        </div>
        <span>{data.floorPrice} ETH</span>
        <span className={styles.lastUpdated}>
          Last Updated :{" "}
          {data.lastUpdated.substring(0, 16).replaceAll("T", " ")}
        </span>
      </div>
    </div>
  );
};

export default Item;
