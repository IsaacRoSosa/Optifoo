import { useState } from "react";
import styles from "./../../styles/Pantry.module.css";
import ButtonGroup from "@/components/ButtonGroup";
import Fridge from "@/components/Fridge";
import AddItem from "@/components/AddItem";

function Pantry() {
  const [selectedTab, setSelectedTab] = useState("FRIDGE");

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>MY PANTRY</h1>
      {selectedTab !== "ADD" && <ButtonGroup setSelectedTab={setSelectedTab} />}
      {selectedTab === "FRIDGE" && <Fridge />}
      {selectedTab === "ADD" && (
        <AddItem onBackClick={() => setSelectedTab("FRIDGE")} />
      )}
    </div>
  );
}

export default Pantry;
