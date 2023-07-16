interface Props {
  variant?: "ping" | "bounce" | "pulse" | "spin";
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
      case "spin":
        return "animate-spin";
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

  if (variant === "spin") {
    return (
      <div
        className={`${getVariantStyle()} w-14 h-14 md:w-20 md:h-20 flex items-center justify-center rounded-full border-t-4 border-t-primary`}
      >
        <div
          className={`${getVariantStyle()} w-10 h-10 md:w-16 md:h-16 rounded-full border-r-4 border-r-primary-100`}
        />
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
