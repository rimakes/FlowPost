import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        console.log('Checking for scheduled posts');
        return NextResponse.json({ message: 'Scheduled' }, { status: 200 });
    } catch (error) {}
}
