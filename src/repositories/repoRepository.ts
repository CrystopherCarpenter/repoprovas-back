import { prisma } from '../database.js';

async function getDataByTerm() {
    return prisma.terms.findMany({
        include: {
            disciplines: {
                include: {
                    teacherDisciplines: {
                        include: {
                            teacher: true,
                            tests: {
                                include: {
                                    categorie: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
}

async function getDataByTeacher() {
    return prisma.teachers.findMany({
        include: {
            teacherDisciplines: {
                include: {
                    discipline: true,
                    tests: {
                        include: {
                            categorie: true,
                        },
                    },
                },
            },
        },
    });
}

async function getTeachers() {
    return prisma.teachers.findMany({});
}

async function getDisciplines() {
    return prisma.disciplines.findMany({});
}

export default {
    getDataByTerm,
    getDataByTeacher,
    getTeachers,
    getDisciplines,
};
