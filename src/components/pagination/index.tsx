import { IconArrowLeft, IconArrowRight } from "../../services/icons";
import styles from "./pagination.module.css";

type PageProps = {
  currentPage: number;
  totalPage: number;
  onSelectPage: (pageIndex: number) => void;
};

const Pagination = ({ currentPage, totalPage, onSelectPage }: PageProps) => {
  const selectPage = (value: string) => {
    const inputPage = parseInt(value);
    onSelectPage(inputPage > totalPage ? totalPage : inputPage);
  };

  return (
    <>
      <div className={styles.totalAmount}>Total: {totalPage}</div>
      <div className={styles.container}>
        <button
          className={styles.select}
          disabled={totalPage === 0 || currentPage === 1}
          onClick={() => onSelectPage(currentPage - 1)}
        >
          <IconArrowLeft />
        </button>
        <input
          className={styles.page}
          type="number"
          value={currentPage}
          onChange={(e) => selectPage(e.target.value)}
        />
        <button
          className={styles.select}
          disabled={totalPage === 0 || currentPage === totalPage}
          onClick={() => {
            onSelectPage(currentPage + 1);
          }}
        >
          <IconArrowRight />
        </button>
      </div>
    </>
  );
};

export default Pagination;
