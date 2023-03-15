import { FaCheckCircle } from "react-icons/fa";
import { orderStatusEnum } from "utils/enums";

interface Props {
  status: string;
}

const ProgressBar = ({ status }: Props) => {
  const getValue = () => {
    switch (status) {
      case orderStatusEnum.PENDING:
        return 0;

      case orderStatusEnum.ORDER_PLACED:
        return 25;

      case orderStatusEnum.READY_FOR_DELIVERY:
        return 50;

      case orderStatusEnum.DELIVERED:
        return 75;

      case orderStatusEnum.COMPLETED:
        return 100;

      default:
        return 0;
    }
  };

  const getColor = () => {
    switch (status) {
      case orderStatusEnum.PENDING:
        return "bg-red-200";

      case orderStatusEnum.ORDER_PLACED:
        return "bg-indigo-300";

      case orderStatusEnum.READY_FOR_DELIVERY:
        return "bg-primary-100";

      case orderStatusEnum.DELIVERED:
        return "bg-purple-300";

      case orderStatusEnum.COMPLETED:
        return "bg-green-400";

      default:
        return "bg-white";
    }
  };
  return (
    <div className="relative w-full h-4 mx-3 flex justify-center items-center bg-gray-200 rounded-3xl overflow-hidden">
      <div
        className={`${getColor()} absolute left-0 top-0 bottom-0 rounded-3xl`}
        style={{ width: `${getValue()}%` }}
      />
      <p className="text-xs z-20">
        {status === orderStatusEnum.COMPLETED ? (
          <FaCheckCircle className="w-3 h-3 text-white" />
        ) : (
          getValue() + "%"
        )}
      </p>
    </div>
  );
};

export default ProgressBar;
