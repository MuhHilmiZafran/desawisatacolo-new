const ButtonPrimary = ({
  type = "submit",
  className = "",
  processing,
  onClick,
  children,
}) => {
  return (
    <button
      type={type}
      className={`box-border border py-4 px-4 rounded-[3px] text-xs transition ${className}`}
      disabled={processing}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
