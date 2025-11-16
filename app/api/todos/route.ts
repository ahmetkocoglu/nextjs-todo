// TypeScript
import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/dbConnection';
import { Todo } from '@/app/todo.model';

export async function GET() {
    await dbConnect();
    const todos = await Todo.find().sort({ createdAt: -1 });
    return NextResponse.json(todos);
}

export async function POST(req: Request) {
    await dbConnect();
    const body = await req.json();
    const todo = await Todo.create({ title: body.title, description: body.description });
    return NextResponse.json(todo, { status: 201 });
}
