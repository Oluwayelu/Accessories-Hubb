import { orderStatusEnum } from "utils/enums";

interface Props {
  status: string;
}

const Status = ({ status }: Props) => {
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
    <div
      className={`${getColor()} relative px-3 py-1 flex justify-center items-center rounded-2xl overflow-hidden`}
    >
      <p className="text-xs whitespace-nowrap truncate">{status}</p>
    </div>
  );
};

export default Status;
