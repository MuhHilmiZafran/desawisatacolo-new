const ImageUploader = ({
  children,
  icon,
  handleChange,
  width = "100px",
  height = "100px",
  className = "",
}) => {
  return (
    <div
      className={`bg-[#E7E4E4] rounded-full relative flex ${className}`}
      style={{ width, height }}
    >
      <div className="m-auto flex overflow-hidden absolute w-full h-full rounded-full ">
        <div className="absolute w-full h-full">
          <input
            className="absolute w-full h-full overflow-hidden opacity-0 z-10 cursor-pointer"
            type="file"
            onChange={(event) => handleChange(event.target.files[0])}
          />
        </div>
        <div className="absolute w-full h-full flex justify-center items-center">
          {children}
        </div>
      </div>
      {icon && (
        <div
          className="absolute w-7 h-7 bottom-0 right-0 p-1 text-white bg-primaryMain rounded-full flex justify-center items-center"
          style={{
            width: `calc(${width} / ${4})`,
            height: `calc(${height} / ${4})`,
          }}
        >
          {icon}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
