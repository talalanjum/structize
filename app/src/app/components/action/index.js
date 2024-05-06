import React, { useState } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import axios from "axios";
import { appUrl } from "@/constants";

export const Action = (props) => {
  const { triggerData, setTriggerData } = props;

  const { triggerInput, triggerValue, url } = triggerData;

  const handleInputChange = (key, value) => {
    setTriggerData({ ...triggerData, [key]: value });
  };

  const saveActionConfig = () => {
    axios
      .post(appUrl + "configure-action", triggerData)
      .then((response) => {
        const { message, modified } = response.data;

        alert(modified ? message : "No changes made");
      })
      .catch((error) => {
        alert("Error fetching data:", error);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.fieldWrapper}>
        <p className={styles.fieldText}>Select Action</p>
        <div className={styles.selectWrapper}>
          <input
            type="text"
            className={styles.field}
            value="Outgoing API Call - GET"
            disabled
          />
        </div>
      </div>
      <div className={styles.fieldWrapper}>
        <p className={styles.fieldText}>URL</p>
        <input
          type="text"
          className={styles.field}
          value={url}
          onChange={(event) => handleInputChange("url", event.target.value)}
        />
      </div>
      <div className={styles.fieldWrapper}>
        <p className={styles.fieldText}>Query parameters</p>
        <div className={styles.queryWrapper}>
          <input
            type="text"
            className={classNames(styles.field, styles.queryField)}
            value={triggerInput}
            onChange={(event) =>
              handleInputChange("triggerInput", event.target.value)
            }
            placeholder="Trigger Input"
          />
          <input
            type="text"
            className={classNames(styles.field, styles.queryField)}
            value={triggerValue}
            onChange={(event) =>
              handleInputChange("triggerValue", event.target.value)
            }
            placeholder="Trigger Value"
          />
        </div>
      </div>
      <button className={styles.primaryButton} onClick={saveActionConfig}>
        Save
      </button>
    </div>
  );
};
