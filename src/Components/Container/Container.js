import "./Container.scss";

const Container = ({ center, children, scroll = true }) => {
  const classNames = ["Container"];

  if (center) {
    classNames.push("Container--center");
  }

  if (scroll) {
    classNames.push("Container--scroll");
  }

  return <div className={classNames.join(" ")}>{children}</div>;
};

export default Container;
