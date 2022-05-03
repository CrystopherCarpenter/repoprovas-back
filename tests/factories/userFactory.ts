import { prisma } from '../../src/database';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

interface User {
    email: string;
    password: string;
}

export function newUser() {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(10),
    };
}

export async function createUser(data: User) {
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    await prisma.user.create({
        data: {
            ...data,
            password: hashedPassword,
        },
    });

    return data;
}
