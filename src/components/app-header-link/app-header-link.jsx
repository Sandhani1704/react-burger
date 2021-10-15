import React from "react";
import styles from "./app-header-link.module.css";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

function AppHeaderLink({ Icon, text }) {
  AppHeaderLink.propTypes = {
    Icon: PropTypes.element,
    text: PropTypes.string,
  };

  return (
    <NavLink to="/" className={styles.item + " pl-5 pr-5 pt-4 pb-4"}>
      <Icon />
      <p className={"pl-2"}>{text}</p>
    </NavLink>
  );
}

export default AppHeaderLink;
