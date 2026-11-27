import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const HASH_PREFIX = '#buku-';

function getBookIdFromHash(hash, books) {
  if (!hash || !hash.startsWith(HASH_PREFIX)) return null;
  const candidateId = decodeURIComponent(hash.slice(HASH_PREFIX.length));
  const exists = books.some((book) => book.id === candidateId);
  return exists ? candidateId : null;
}

export function useBookModal(allBooks, filteredBooks) {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(() =>
    getBookIdFromHash(location.hash, allBooks)
  );

  useEffect(() => {
    setSelectedId(getBookIdFromHash(location.hash, allBooks));
  }, [location.hash, allBooks]);

  const open = useCallback(
    (bookId) => {
      setSelectedId(bookId);
      const nextHash = `${HASH_PREFIX}${encodeURIComponent(bookId)}`;
      if (location.hash !== nextHash) {
        navigate(`${location.pathname}${location.search}${nextHash}`, {
          replace: true,
        });
      }
    },
    [location.hash, location.pathname, location.search, navigate]
  );

  const close = useCallback(() => {
    setSelectedId(null);
    if (location.hash.startsWith(HASH_PREFIX)) {
      navigate(`${location.pathname}${location.search}`, { replace: true });
    }
  }, [location.hash, location.pathname, location.search, navigate]);

  const selectedBook = selectedId
    ? allBooks.find((book) => book.id === selectedId) ?? null
    : null;

  const currentIndex = selectedBook
    ? filteredBooks.findIndex((book) => book.id === selectedBook.id)
    : -1;

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < filteredBooks.length - 1;

  const goPrev = useCallback(() => {
    if (!hasPrev) return;
    open(filteredBooks[currentIndex - 1].id);
  }, [hasPrev, filteredBooks, currentIndex, open]);

  const goNext = useCallback(() => {
    if (!hasNext) return;
    open(filteredBooks[currentIndex + 1].id);
  }, [hasNext, filteredBooks, currentIndex, open]);

  return {
    selectedBook,
    open,
    close,
    hasPrev,
    hasNext,
    goPrev,
    goNext,
    currentIndex,
    totalInList: filteredBooks.length,
  };
}
