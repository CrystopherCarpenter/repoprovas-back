import { prisma } from '../database.js';
import { CreateUserData, BlockToken } from '../services/userService.js';

async function findByEmail(email: string) {
    return prisma.users.findUnique({
        where: {
            email,
        },
    });
}

async function findById(id: number) {
    return prisma.users.findUnique({
        where: {
            id,
        },
    });
}

async function findToken(token: string) {
    return prisma.tokenBlockList.findUnique({
        where: {
            token,
        },
    });
}

async function insert(createUserData: CreateUserData) {
    await prisma.users.create({
        data: createUserData,
    });
}

async function insertBlockedToken(blockToken: BlockToken) {
    await prisma.tokenBlockList.create({
        data: blockToken,
    });
}

export default {
    findByEmail,
    insert,
    findById,
    findToken,
    insertBlockedToken,
};
