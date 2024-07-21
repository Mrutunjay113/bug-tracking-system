import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Heading = ({ headingTitle, size, className }) => {
  const headingClass = classNames(
    "font-bold my-5",
    {
      "text-3xl": size === "lg",
      "text-xl": size === "md",
      "text-base": size === "sm",
    },
    className
  );

  return <h1 className={headingClass}>{headingTitle}</h1>;
};

Heading.propTypes = {
  headingTitle: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["lg", "md", "sm"]),
  className: PropTypes.string,
};

Heading.defaultProps = {
  size: "md",
  className: "",
};

export default Heading;
