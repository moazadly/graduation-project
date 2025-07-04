"use client";
import SearchBar from "./SearchBar";
import { useRouter } from "next/navigation";

function Search() {
  const router = useRouter();

  function handleSearch(val) {
    router.push(`?word=${val}`);
  }

  return (
    <SearchBar
      onSearch={handleSearch}
      placeholder="أدخل الكلمة التي تريد البحث عنها"
      oneWord={true}
    />
  );
}

export default Search;
