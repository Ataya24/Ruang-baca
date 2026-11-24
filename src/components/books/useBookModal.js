import { useCallback, useEffect, useState } from 'react';

const HASH_PREFIX = '#buku-';

function getBookIdFromHash(books) {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash;
  if (!hash.startsWith(HASH_PREFIX)) return null;
  const candidateId = decodeURIComponent(hash.slice(HASH_PREFIX.length));
  const exists = books.some((book) => book.id === candidateId);
  return exists ? candidateId : null;
}

export function useBookModal(allBooks, filteredBooks) {
  const [selectedId, setSelectedId] = useState(() => getBookIdFromHash(allBooks));

  useEffect(() => {
    const onHashChange = () => {
      setSelectedId(getBookIdFromHash(allBooks));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [allBooks]);

  const open = useCallback((bookId) => {
    setSelectedId(bookId);
    const nextHash = `${HASH_PREFIX}${encodeURIComponent(bookId)}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash);
    }
  }, []);

  const close = useCallback(() => {
    setSelectedId(null);
    if (window.location.hash.startsWith(HASH_PREFIX)) {
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${window.location.search}`
      );
    }
  }, []);

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
