import { PropTypes } from "prop-types";
import React from "react";
import { Helmet } from "react-helmet-async";

export default function PageTitle({ title }) {
  return (
    <Helmet>
      <title>{title} | Instaclone</title>
    </Helmet>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
