import { authOptions } from '@/auth';
import { db } from '@/lib/prisma';
import { getServerSession, Session } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
/**
 *
 * @param req : userId -> to check if user's has connected the linkedin account or not
 * @returns:{ loginUser: true } based on which frontend decides which pop-up to show,
 */
//TODO: Careful, there are Google and LinkedIn accounts!
//TODO: The message should be something like "Account connected", shouldn't it?
export async function POST(req: NextRequest) {
    try {
        const session: Session | null = await getServerSession(authOptions);
        const userAccount = await db.account.findFirst({
            where: { userId: session?.user?.id}, 
        });
        
        if (!userAccount) {
            return NextResponse.json({ loginUser: false }, { status: 200 });
        }
        
        return NextResponse.json(
            { message: 'Account connected', loginUser: true }, 
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}
