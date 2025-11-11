import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar producto..."
        className="border rounded p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 rounded">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
