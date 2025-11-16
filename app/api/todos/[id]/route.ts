// TypeScript
import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/dbConnection';
import { Todo } from '@/app/todo.model';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    const body = await req.json();
    const updated = await Todo.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!updated) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    const deleted = await Todo.findByIdAndDelete(params.id);
    if (!deleted) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json({ ok: true });
}