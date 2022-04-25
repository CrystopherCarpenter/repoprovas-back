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

export default {
    getDataByTerm,
    getDataByTeacher,
};
