import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

function generateOTP(): string {
    const length = 8;
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let OTP = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        OTP += characters[randomIndex];
    }
    return OTP;
}

function generateUniqueString(): string {
    const timestamp: number = new Date().getTime();
    const randomString: string = Math.random().toString(36).substring(2);
    const uniqueString: string = timestamp.toString(36) + randomString;
    if (uniqueString.length < 16) {
        return uniqueString.padEnd(16, '0');
    } else if (uniqueString.length > 16) {
        return uniqueString.substring(0, 16);
    } else {
        return uniqueString;
    }
}

export const userRouter = createTRPCRouter({
    login: publicProcedure.input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
        // Lookup in users
        const existingUser = await ctx.db.user.findFirst({
            where: { email: input.email },
        });
        if (existingUser !== null && existingUser.password === input.password) {
            return { success: true, code: 200, userId: existingUser.id };
        }
        // If user email present in db
        return { success: false, code: 401 };
      }),
    register: publicProcedure
      .input(z.object({ name: z.string().min(1), email: z.string(), password: z.string() }))
      .mutation(async ({ ctx, input }) => {
        // Lookup in users
        const existingUser = await ctx.db.user.findFirst({
            where: { email: input.email },
        });
        if (existingUser === null) {
            // Create new user in db
            const newUser = await ctx.db.user.create({data: { ...input }});
            if (newUser !== null) {
                // Create new token and otp in db
                const otp = generateOTP();
                const token = generateUniqueString();
                const newToken = await ctx.db.token.create({ data: { otp, token, userEmail: input.email }});
                // return token and otp
                if (newToken !== null) {
                    return { otp, token, success: true, code: 200 };
                }
            }
        }
        // If user email present in db
        return { success: false, code: 401 };
      }),
    verify: publicProcedure.input(z.object({ token: z.string(), otp: z.string() }))
    .mutation(async ({ ctx, input }) => {
        // Lookup in token
        const existingToken = await ctx.db.token.findFirst({
            where: { token: input.token },
        });
        if (existingToken !== null && existingToken.otp === input.otp) {
            // Delete token from DB and make user verify = true
            const delToken = await ctx.db.token.delete({
                where: { token: input.token },
            });
            if (delToken !== null) {
                const updatedUser = await ctx.db.user.update({
                    where: { email: delToken.userEmail },
                    data: { isVerified: true },
                });
                return {
                    success: true,
                    message: 'user verified',
                    code: 200,
                    userId: updatedUser.id,
                }
            }
        }
        // If some issue
        return { success: false, code: 401 };
    }),
    getInterests: publicProcedure
        .input(z.object({ pageSize: z.number(), pageNumber: z.number() }))
        .query(async ({ ctx, input }) => {
            const interests = await ctx.db.interests.findMany({
                where: {},
                take: input.pageSize,
                skip: (input.pageNumber - 1) * input.pageSize,
            });
            return { interests, success: true };
        }),
    getUserInterests: publicProcedure
        .input(z.object({ userId: z.number() }))
        .query(async ({ ctx, input }) => {
            const interests = await ctx.db.userInterest.findMany({
                where: {
                    userId: { equals: input.userId }
                },
            });
            const obj: Record<number, boolean> = {};
            interests.forEach((interest) => {
                obj[interest.interestId] = true;
            });
            return { interestsObj: obj, success: true };
        }),
    updateInterests: publicProcedure
        .input(z.object({ productId: z.number(), check: z.boolean(), userId: z.number() }))
        .mutation(async ({ ctx, input }) => {
            if (input.check === false) {
                const uniq = await ctx.db.userInterest.findFirst({ where: {interestId: { equals: input.productId }, userId: { equals: input.userId }}});
                if (uniq !== null) {
                    await ctx.db.userInterest.delete({ where: { id: uniq.id } });
                }
            } else {
                await ctx.db.userInterest.create({ data: { interestId: input.productId, userId: input.userId }});
            }
            return { success: true, code: 200 };
        }),
});
