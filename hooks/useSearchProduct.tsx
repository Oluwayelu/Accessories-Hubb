import { useRouter } from "next/router";
import { useState, useEffect, FormEventHandler } from "react";

import { products } from "utils/data";

import type { IHandleChange, IProduct } from "interface";

export const useSearchProduct = () => {
  const { push } = useRouter();
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<IProduct[]>([]);

  const handleChange: IHandleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log(query);
    push({
      pathname: "/search",
      query: { query },
    });
  };

  console.log(query);
  useEffect(() => {
    const filter = products.filter((x) => {
      return (
        x.name.toLowerCase().includes(query.toLowerCase()) ||
        x.category.toLowerCase().includes(query.toLowerCase())
      );
    });

    if (query === "") {
      setResult([]);
    } else {
      setResult(filter);
    }
    sessionStorage.setItem("search", JSON.stringify(filter));
  }, [query]);

  return {
    query,
    setQuery,
    result,
    setResult,
    handleChange,
    handleSubmit,
  };
};
