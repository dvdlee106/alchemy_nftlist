import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src="./images/logo.svg" className={styles.logo} alt="logo" />
      <span className={styles.logotext}>Altura NFT</span>
    </header>
  );
};

export default Header;
