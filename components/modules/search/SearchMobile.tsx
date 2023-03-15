import { useSearchProduct } from "hooks";
import { FaAngleLeft } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

import type { MouseEventHandler } from "react";

type Props = {
  close: MouseEventHandler;
};

const SearchMobile = ({ close }: Props) => {
  const { query, result, setQuery, handleChange, handleSubmit } =
    useSearchProduct();

  return (
    <div className="lg:hidden fixed h-screen w-full inset-0 bg-white z-50">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between w-full h-[8vh] shadow px-3 space-x-3"
      >
        <FaAngleLeft onClick={close} className="w-5 h-5" />
        <input
          type="search"
          name="search"
          value={query}
          onChange={handleChange}
          placeholder="Looking for.."
          className="w-full"
        />
        <button type="submit">
          <AiOutlineSearch className="w-7 h-7" />
        </button>
      </form>

      <div className="p-5 space-y-5">
        {result.map((item, idx) => {
          return (
            <div
              key={idx}
              className="cursor-pointer"
              onClick={(e) => {
                setQuery(e.currentTarget.innerText);
                handleSubmit(e);
                setTimeout(() => {
                  close(e);
                }, 500);
              }}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchMobile;
