import { useNoScroll } from "hooks";
import { ReactNode, FC } from "react";
import { FaTimes } from "react-icons/fa";

type Props = {
  id: string;
  title: string;
  children: ReactNode;
};

const Modal: FC<Props> = ({ id, title, children }) => {
  // useNoScroll();

  const toggle = () => {
    document.getElementById(`${id}-modal-toggle`)?.classList.toggle("hidden");
    document.getElementById(`${id}-modal-toggle`)?.classList.toggle("block");
  };

  const close = () => {
    document.getElementById(`${id}-modal`)?.classList.toggle("hidden");
  };

  return (
    <div
      id={`${id}-modal`}
      className="w-full h-full p-5 fixed inset-0 flex justify-center items-center z-20 hidden"
    >
      <div onClick={close} className="fixed inset-0 bg-dark/50" />
      <div className="relative w-full md:w-fit h-fit flex flex-col gap-5 bg-white p-5 rounded-3xl">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-xl font-medium">{title}</h2>

          <button onClick={close}>
            <FaTimes className="w-4 h-4 text-error" />
          </button>
        </div>
        <div className="w-full inline-flex flex-col gap-3">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
