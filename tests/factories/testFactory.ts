import { faker } from '@faker-js/faker';
import { prisma } from '../../src/database';

export async function testBodyFactory(
    categoryId: number,
    teacherDisciplineId: number
) {
    const test = {
        name: faker.hacker.noun(),
        pdfUrl: faker.internet.url(),
        categoryId,
        teacherDisciplineId,
    };

    return test;
}

export async function testIdFactory(body) {
    await prisma.test.create({
        data: body,
    });

    const tests = await prisma.test.findMany();
    return tests[0].id;
}
