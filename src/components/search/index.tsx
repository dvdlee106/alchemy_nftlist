import { IconSearch } from "../../services/icons";

import styles from "./search.module.css";

type SearchProps = {
  address: string;
  setAddress: (value: string) => void;
};

const Search = ({ address, setAddress }: SearchProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <IconSearch />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Please insert the contract address!"
        />
      </div>
    </div>
  );
};

export default Search;
