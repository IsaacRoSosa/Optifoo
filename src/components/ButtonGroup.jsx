import styles from "./../styles/ButtonGroup.module.css";

function ButtonGroup({ setSelectedTab }) {
  return (
    <div className={styles.buttonGroup}>
      <button
        className={styles.button}
        onClick={() => setSelectedTab("FRIDGE")}
      >
        FRIDGE
      </button>
      <button className={styles.button} onClick={() => setSelectedTab("ADD")}>
        ADD ITEM
      </button>
      <button
        className={styles.button}
        onClick={() => setSelectedTab("FREEZER")}
      >
        FREEZER
      </button>
    </div>
  );
}

export default ButtonGroup;
