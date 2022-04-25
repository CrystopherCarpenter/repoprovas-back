import { Users, TokenBlockList } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepository.js';
dotenv.config();

export type CreateUserData = Omit<Users, 'id'>;
export type BlockToken = Omit<TokenBlockList, 'id'>;

async function insert(createUserData: CreateUserData) {
    const alreadyExists = await userRepository.findByEmail(
        createUserData.email
    );
    if (alreadyExists) {
        throw { type: 'conflict', message: 'Users must have unique emails' };
    }

    const hashedPassword = bcrypt.hashSync(createUserData.password, 10);

    await userRepository.insert({
        ...createUserData,
        password: hashedPassword,
    });
}

async function findById(id: number) {
    const user = await userRepository.findById(id);
    if (!user) throw { type: 'not_found' };

    delete user.password;
    return user;
}

async function signIn({ email, password }: CreateUserData) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw { type: 'unauthorized', message: 'Invalid credentials' };
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
        throw { type: 'unauthorized', message: 'Invalid credentials' };
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    return token;
}

async function findToken(token: string) {
    const blockedToken = await userRepository.findToken(token);
    if (blockedToken) {
        throw { type: 'unauthorized' };
    }

    return;
}

async function insertBlockedToken(blockToken: BlockToken) {
    await userRepository.insertBlockedToken(blockToken);
    return;
}

export default {
    insert,
    signIn,
    findById,
    findToken,
    insertBlockedToken,
};
