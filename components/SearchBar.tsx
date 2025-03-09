"use client";
import { FaSearch } from 'react-icons/fa'; // Icône de recherche
import { Input } from './ui/input';
import { useSnippetsFiltered } from '@/store/snippetsFiltered';

function SearchBar() {
    const {searchQuery, setSearchQuery} = useSnippetsFiltered();
  return (
    <div className="relative w-full max-w-md mx-auto">
      <Input
        type="text"
        placeholder="Rechercher..."
        className="pl-10 py-2 border rounded-full w-full shadow-md bg-background"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
}

export default SearchBar;
