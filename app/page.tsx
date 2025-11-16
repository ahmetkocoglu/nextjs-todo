// TypeScript
'use client';
import { useEffect, useState } from 'react';

type Todo = { _id: string; title: string; description?: string; completed: boolean };

export default function Page() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const load = async () => {
        const res = await fetch('/api/todos', { cache: 'no-store' });
        setTodos(await res.json());
    };

    useEffect(() => { load(); }, []);

    const add = async () => {
        if (!title.trim()) return;
        const res = await fetch('/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description: desc }),
        });
        const t = await res.json();
        setTodos((s) => [t, ...s]);
        setTitle(''); setDesc('');
    };

    const toggle = async (id: string, completed: boolean) => {
        const res = await fetch(`/api/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !completed }),
        });
        const t = await res.json();
        setTodos((s) => s.map((x) => (x._id === id ? t : x)));
    };

    const remove = async (id: string) => {
        await fetch(`/api/todos/${id}`, { method: 'DELETE' });
        setTodos((s) => s.filter((x) => x._id !== id));
    };

    return (
        <main style={{ maxWidth: 640, margin: '0 auto', padding: 16 }}>
            <h1>Todo</h1>
            <div style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Başlık" />
                <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Açıklama" />
                <button onClick={add}>Ekle</button>
            </div>
            <ul style={{ display: 'grid', gap: 8 }}>
                {todos.map((t: Todo, i: number) => (
                    <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <input type="checkbox" checked={t.completed} onChange={() => toggle(t._id, t.completed)} />
                        <div style={{ flex: 1, textDecoration: t.completed ? 'line-through' : 'none' }}>
                            <div>{t.title}</div>
                            {t.description && <small>{t.description}</small>}
                        </div>
                        <button onClick={() => remove(t._id)}>Sil</button>
                    </li>
                ))}
            </ul>
        </main>
    );
}