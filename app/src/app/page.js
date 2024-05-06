"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";

import { Action } from "./components/action";
import { appUrl } from "@/constants";

export default function Home() {
  const [triggerData, setTriggerData] = useState({
    url: "",
    triggerInput: "",
    triggerValue: "",
  });

  useEffect(() => {
    axios
      .get(appUrl + "action-info")
      .then((response) => {
        setTriggerData(response.data.fields[0]);
      })
      .catch((error) => {
        alert("Error fetching data:", error);
      });
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.diagramWrapper}>
        <div className={styles.workflowItem}>
          <p>Trigger</p>
          <p>Incoming API Call</p>
        </div>
        <Image
          src="/static/down-arrow.png"
          width={128}
          height={128}
          alt="arrow-down"
          className={styles.arrowDown}
        />
        <div
          className={classNames(styles.workflowItem, styles.activeWorkflowItem)}
        >
          <p>Action</p>
          <p>Outgoing API Call - GET</p>
        </div>
      </div>
      <div className={styles.formWrapper}>
        <Action triggerData={triggerData} setTriggerData={setTriggerData} />
      </div>
    </main>
  );
}
