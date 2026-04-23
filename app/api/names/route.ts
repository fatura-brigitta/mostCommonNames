import { NextRequest } from 'next/server';
import { namesData } from '../../data/names';

export async function POST(req: NextRequest) {
  const { year, limit } = await req.json();

  if (!namesData[year]) {
    return Response.json({ error: 'Invalid year' }, { status: 400 });
  }

  const data = namesData[year];

  return Response.json({
    boys: data.boys.slice(0, limit),
    girls: data.girls.slice(0, limit)
  });
}