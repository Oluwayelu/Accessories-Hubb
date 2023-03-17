interface Props {
  variant?: "ping" | "bounce" | "pulse";
  color?: string;
  className?: string;
}
const Loader = ({ variant = "bounce", color, className }: Props) => {
  const circleCommonClasses = "h-2.5 w-2.5 bg-white rounded-full";
  const getVariantStyle = () => {
    switch (variant) {
      case "bounce":
        return "animate-bounce";
      case "ping":
        return "animate-ping";
      case "pulse":
        return "animate-pulse";
      default:
        return "";
    }
  };

  if (variant === "ping") {
    return (
      <div className={`${className} w-full flex justify-center items-center`}>
        <div
          className={`${circleCommonClasses} ${getVariantStyle()} mr-1`}
          style={{ backgroundColor: color }}
        ></div>
      </div>
    );
  }

  return (
    <div className={`${className} w-full flex justify-center items-center`}>
      <div
        className={`${circleCommonClasses} ${getVariantStyle()} mr-1`}
        style={{ backgroundColor: color }}
      ></div>
      <div
        className={`${circleCommonClasses} ${getVariantStyle()} mr-1 duration-500`}
        style={{ backgroundColor: color }}
      ></div>
      <div
        className={`${circleCommonClasses} ${getVariantStyle()} duration-1000`}
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
};

export default Loader;
