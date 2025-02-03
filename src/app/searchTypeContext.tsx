import { createContext, ReactNode, useState } from 'react';

export type SearchType = 'movie' | 'show' | 'person' | 'movie,show';

export interface SearchTypeContextType {
  searchType: SearchType;
  setSearchType: (type: SearchType) => void;
}

export const SearchTypeContext = createContext<SearchTypeContextType | null>(null);

export const SearchTypeProvider = ({ children }: { children: ReactNode }) => {
  const [searchType, setSearchType] = useState<SearchType>("movie");

  return (
    <SearchTypeContext.Provider value={{ searchType, setSearchType }}>
      {children}
    </SearchTypeContext.Provider>
  );
};