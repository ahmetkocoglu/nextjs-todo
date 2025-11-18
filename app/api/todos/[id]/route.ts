// TypeScript
import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/dbConnection';
import { Todo } from '@/app/todo.model';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    await dbConnect();
    const body = await req.json();
    const updated = await Todo.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updated) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    await dbConnect();
    console.log(' >> ',id)
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json({ ok: true });
}
