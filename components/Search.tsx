"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getFiles } from "@/lib/actions/file.action";
import { Models } from "node-appwrite";
import Thumbnail from "@/components/Thumbnail";
import FormattedDateTime from "@/components/FormattedDateTime";
import { useDebounce } from "use-debounce";

const Search = () => {
  const debounceRef = useRef(null);
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();

  const [debouncedQuery] = useDebounce(query, 300);

  function debounce(fn, delay) {
    let timer; // 1️⃣ store timer ID

    return function (...args) {
      // 2️⃣ this is the debounced version of `fn`
      clearTimeout(timer); // 3️⃣ clear the previous timer if user is still typing
      timer = setTimeout(() => {
        fn(...args); // 4️⃣ call the original function after the delay
      }, delay);
    };
  }

  const fetchFiles = useCallback(async () => {
    if (query.length === 0) {
      setResults([]);
      setOpen(false);
      return router.push(path.replace(searchParams.toString(), ""));
    }

    const files = await getFiles({
      types: [],
      searchText: query,
    });

    setResults(files.documents);
    setOpen(true);
  }, [query, router, path, searchParams]);

  useEffect(() => {
    const debounced = debounce(fetchFiles, 300); // 1. Create debounced version of fetchFiles
    debounceRef.current = debounced; // 2. Store it in a ref (so it's accessible outside)

    debounced(); // 3. Call the debounced function

    return () => {
      if (debounceRef.current?.cancel) {
        debounceRef.current.cancel(); // 4. Clean up any pending debounce when component unmounts or deps change
      }
    };
  }, [fetchFiles]); // Re-run if fetchFiles changes
  types: [],
    useEffect(() => {
      if (!searchQuery) {
        setQuery("");
      }
    }, [searchQuery]);

  const handleClickItem = (file: Models.Document) => {
    setOpen(false);
    setResults([]);

    router.push(
      `/${file.type === "video" || file.type === "audio" ? "media" : file.type + "s"}?query=${query}`,
    );
  };

  return (
    <div className="search">
      <div className="search-input-wrapper">
        <Image
          src="/assets/icons/search.svg"
          alt="Search"
          width={24}
          height={24}
        />
        <Input
          value={query}
          placeholder="Search..."
          className="search-input body-2 shad-no-focus  placeholder:body-1"
          onChange={(e) => setQuery(e.target.value)}
        />

        {open && (
          <ul className="search-result">
            {results.length > 0 ? (
              results.map((file) => (
                <li
                  className="flex items-center justify-between"
                  key={file.$id}
                  onClick={() => handleClickItem(file)}
                >
                  <div className="flex cursor-pointer items-center gap-4">
                    <Thumbnail
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      className="size-9 min-w-9"
                    />
                    <p className="subtitle-2 line-clamp-1 text-light-100">
                      {file.name}
                    </p>
                  </div>

                  <FormattedDateTime
                    date={file.$createdAt}
                    className="caption line-clamp-1 text-light-200"
                  />
                </li>
              ))
            ) : (
              <p className="empty-result body-2">No files found</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
