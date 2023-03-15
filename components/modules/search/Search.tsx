import { AiOutlineSearch } from "react-icons/ai";

import { useSearchProduct } from "hooks";

const Search = () => {
  const { query, result, setQuery, handleChange, handleSubmit } =
    useSearchProduct();

  return (
    <div className="absolute md:bottom-1/2 w-full h-fit flex justify-center items-center">
      <div className="w-3/4 md:w-1/2 flex items-center gap-2 bg-white px-4 rounded-lg overflow-visible z-20">
        <button
          className="p-3 my-2 w-10 h-10 bg-primary flex items-center justify-center rounded-full"
          onClick={handleSubmit}
        >
          <AiOutlineSearch />
        </button>

        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="search"
            name="search"
            placeholder="Search Product"
            className="border-none w-full h-full border-0 m-0 py-0 "
            onChange={handleChange}
            value={query}
          />
        </form>
      </div>

      <div className="w-full lg:w-1/2 top-3/4 bg-white absolute z-40">
        {result.map((item, idx) => {
          return (
            <div
              key={idx}
              className="p-3 cursor-pointer"
              onClick={(e) => {
                setQuery(e.currentTarget.innerText);
                handleSubmit(e);
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

export default Search;
