import { useState } from "react";
import styles from "./Pantry.module.css";

function Pantry() {
  const [lettuceAmount, setLettuceAmount] = useState(100);
  const [carrotAmount, setCarrotAmount] = useState(100);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>MY PANTRY</h1>
      <div className={styles.buttonGroup}>
        <button className={styles.button}>FRIDGE</button>
        <button className={styles.button}>ADD ITEM</button>
        <button className={styles.button}>FREEZER</button>
      </div>

      <div className={styles.grid}>
        <div>
          <h2 className={styles.sectionTitle}>MEALS</h2>
          <div className={styles.gridItems}>
            <div className={styles.item}>
              <img src="/meal1.png" alt="Meal" className={styles.image} />
              <div className={styles.tag}>1D</div>
              <div>Salad</div>
              <div>100g</div>
            </div>
          </div>
        </div>
        <div>
          <h2 className={styles.sectionTitle}>VEGETABLES</h2>
          <div className={styles.gridItems}>
            <div className={styles.item}>
              <img src="/lettuce.png" alt="Lettuce" className={styles.image} />
              <div className={styles.control}>
                <button onClick={() => setLettuceAmount(lettuceAmount - 100)}>
                  -
                </button>
                <span>{lettuceAmount}g</span>
                <button onClick={() => setLettuceAmount(lettuceAmount + 100)}>
                  +
                </button>
              </div>
              <div>Lettuce</div>
            </div>

            <div className={styles.item}>
              <img src="/carrot.png" alt="Carrot" className={styles.image} />
              <div className={styles.control}>
                <button onClick={() => setCarrotAmount(carrotAmount - 100)}>
                  -
                </button>
                <span>{carrotAmount}g</span>
                <button onClick={() => setCarrotAmount(carrotAmount + 100)}>
                  +
                </button>
              </div>
              <div>Carrot</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className={styles.sectionTitle}>FRUITS</h2>
          <div className={styles.gridItems}>
            <div className={styles.item}></div>
          </div>
        </div>

        <div className={styles.fullWidth}>
          <h2 className={styles.sectionTitle}>
            PANTRY STAPLES, FROZEN FOODS...
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Pantry;
