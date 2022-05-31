import { useState } from "react";
import { useRouter } from "next/router";

import { FaAngleLeft } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

import type {
  SetStateAction,
  FunctionComponent,
  MouseEventHandler,
} from "react";

type Props = {
  close: MouseEventHandler;
};
const Search: FunctionComponent<Props> = ({ close }) => {
  const { push } = useRouter();
  const [query, setQuery] = useState("");

  const queryChangeHandler = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    push(`/search?query=${query}`);
  };
  return (
    <div className="lg:hidden fixed h-screen w-full inset-0 bg-white z-50">
      <form
        onSubmit={submitHandler}
        className="absolute flex items-center w-full h-12 shadow px-3 space-x-3"
      >
        <FaAngleLeft onClick={close} className="w-5 h-5" />
        <input
          onChange={queryChangeHandler}
          placeholder="Looking for.."
          className="w-full"
        />
        <button type="submit">
          <AiOutlineSearch className="w-7 h-7" />
        </button>
      </form>
    </div>
  );
};

export default Search;
