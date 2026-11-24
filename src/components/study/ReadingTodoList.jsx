import { useState } from 'react';
import { CheckSquare, Plus, Trash2 } from 'lucide-react';
import Button from '../ui/Button';

const INITIAL_TODOS = [
  { id: 1, text: 'Baca Bab 1 Dasar-Dasar Algoritma', done: false },
  { id: 2, text: 'Catat poin diskusi Klub Baca Jumat', done: true },
];

export default function ReadingTodoList() {
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const completedCount = todos.filter((item) => item.done).length;

  function handleAdd(event) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) {
      setError('Tuliskan rencana baca atau tugas terlebih dahulu.');
      return;
    }

    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, done: false },
    ]);
    setInput('');
    setError('');
  }

  function handleToggle(id) {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }

  function handleDelete(id) {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <article className="flex h-full flex-col justify-between rounded-card border border-line bg-white p-6">
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex size-10 items-center justify-center rounded-[10px] bg-brand-soft text-brand">
              <CheckSquare size={20} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold tracking-tight text-ink">
                Daftar Rencana Baca
              </h3>
              <p className="text-xs text-muted">
                Kelola daftar bacaan dan target belajarmu
              </p>
            </div>
          </div>
          <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-muted border border-line">
            {completedCount}/{todos.length} selesai
          </span>
        </div>

        <form onSubmit={handleAdd} noValidate className="mt-5">
          <label htmlFor="input-todo-baca" className="sr-only">
            Tambah rencana baca
          </label>
          <div className="flex gap-2">
            <input
              id="input-todo-baca"
              type="text"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                if (error) setError('');
              }}
              placeholder="Contoh: Ringkas bab 3 Basis Data"
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? 'err-todo-baca' : undefined}
              className={`h-11 min-w-0 flex-1 rounded-[10px] border bg-white px-3.5 text-sm text-ink placeholder:text-muted transition-colors ${
                error ? 'border-danger' : 'border-line focus:border-brand'
              }`}
            />
            <Button type="submit" variant="primary" size="md">
              <Plus size={16} aria-hidden="true" />
              Tambah
            </Button>
          </div>
          {error && (
            <p id="err-todo-baca" className="mt-1.5 text-xs font-medium text-danger">
              {error}
            </p>
          )}
        </form>

        {todos.length === 0 ? (
          <div className="mt-5 rounded-card border border-dashed border-line bg-surface p-6 text-center text-sm text-muted">
            Belum ada rencana baca. Tambahkan target belajarmu di atas.
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-line rounded-card border border-line">
            {todos.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 px-3.5 py-2.5"
              >
                <label className="flex min-w-0 flex-1 items-center gap-3 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => handleToggle(item.id)}
                    className="size-4 shrink-0 rounded border-line accent-brand"
                  />
                  <span
                    className={`truncate ${
                      item.done ? 'text-muted line-through' : 'text-ink'
                    }`}
                  >
                    {item.text}
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  aria-label={`Hapus ${item.text}`}
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-danger-soft hover:text-danger"
                >
                  <Trash2 size={15} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
