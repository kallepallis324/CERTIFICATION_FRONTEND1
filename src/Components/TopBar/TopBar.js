import React from "react";
import logoIPL from "./logo_ipl.png";
import edyodaLogo from "./edyoda-logo.png";
import classes from "./TopBar.module.css";
import { Link } from "react-router-dom";

export default function TopBar(props) {
  return (
    <div className={classes.topbarWrapper}>
      <Link to="/" className={classes.leftDiv}>
        <img src={logoIPL} alt="logo" />
      </Link>
      <div className={classes.rightDiv}>
        <button
          onClick={() => {
            props.shareDataToComponents(!props.isOpen);
          }}
        >
          Add New Players
        </button>
      </div>
      <img
        src={edyodaLogo}
        alt="edyodaLogo"
        className={classes.edyodaProjectsLogo}
      />
    </div>
  );
}
