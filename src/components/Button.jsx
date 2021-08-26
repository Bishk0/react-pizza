import classNames from "classnames";

function Button({ onClick, className, children }) {
  return(
    <button
      onClick={onClick}
      className={classNames('button', className)}
    >
      {children}
    </button>
  );
}

export default Button;
