import { prisma } from '../database.js';
import { TestData } from '../services/testService.js';

async function getTestsByDiscipline() {
    return prisma.term.findMany({
        include: {
            disciplines: {
                include: {
                    teacherDisciplines: {
                        include: {
                            teacher: true,
                            tests: {
                                include: {
                                    category: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
}

async function getTestsByTeachers() {
    return prisma.teacherDiscipline.findMany({
        include: {
            teacher: true,
            discipline: true,
            tests: {
                include: {
                    category: true,
                },
            },
        },
    });
}

async function insert(testData: TestData) {
    return prisma.test.create({
        data: testData,
    });
}

async function updateViews(testId: number) {
    return prisma.test.update({
        where: {
            id: testId,
        },
        data: {
            views: {
                increment: 1,
            },
        },
    });
}

export default {
    getTestsByDiscipline,
    getTestsByTeachers,
    insert,
    updateViews,
};
