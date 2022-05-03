import { prisma } from '../src/database.js';
import {
    User,
    Term,
    Discipline,
    Teacher,
    TeacherDiscipline,
    Category,
    Test,
} from '@prisma/client';

type UserData = Omit<User, 'id'>;
type TermData = Omit<Term, 'id'>;
type DisciplineData = Omit<Discipline, 'id'>;
type TeacherData = Omit<Teacher, 'id'>;
type TeacherDisciplineData = Omit<TeacherDiscipline, 'id'>;
type CategoryData = Omit<Category, 'id'>;
type TestData = Omit<Test, 'id' | 'views'>;

async function main() {
    const user: UserData = {
        email: 'teste@email.com',
        password: '123456',
    };
    const terms: TermData[] = [
        { number: 1 },
        { number: 2 },
        { number: 3 },
        { number: 4 },
    ];
    const disciplines: DisciplineData[] = [
        { name: 'CNV', termId: 3 },
        { name: 'CSS', termId: 1 },
        { name: 'HTML', termId: 1 },
        { name: 'JavaScript', termId: 2 },
        { name: 'React', termId: 2 },
        { name: 'Node', termId: 3 },
        { name: 'Express', termId: 3 },
        { name: 'Prisma', termId: 4 },
        { name: 'Mongo', termId: 4 },
        { name: 'SQL', termId: 4 },
    ];

    const teachers: TeacherData[] = [
        { name: 'Dina' },
        { name: 'Bruna' },
        { name: 'Yann' },
        { name: 'Léo' },
        { name: 'Pedrão' },
    ];

    const teachersDisciplines: TeacherDisciplineData[] = [
        { teacherId: 2, disciplineId: 1 },
        { teacherId: 1, disciplineId: 2 },
        { teacherId: 1, disciplineId: 3 },
        { teacherId: 1, disciplineId: 4 },
        { teacherId: 1, disciplineId: 5 },
        { teacherId: 4, disciplineId: 6 },
        { teacherId: 5, disciplineId: 7 },
        { teacherId: 3, disciplineId: 8 },
        { teacherId: 3, disciplineId: 9 },
        { teacherId: 5, disciplineId: 10 },
    ];

    const categories: CategoryData[] = [
        { name: 'Prova Prática' },
        { name: 'P1' },
        { name: 'P2' },
        { name: 'P3' },
    ];

    const tests: TestData[] = [
        {
            name: 'Linkr',
            pdfUrl: 'https://linkr-t4.vercel.app/',
            categoryId: 1,
            teacherDisciplineId: 4,
        },
        {
            name: 'MyWallet',
            pdfUrl: 'https://my-wallet-front-pi.vercel.app/',
            categoryId: 1,
            teacherDisciplineId: 4,
        },
    ];

    await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: { ...user },
    });

    terms.forEach(async (term) => {
        await prisma.term.upsert({
            where: { number: term.number },
            update: {},
            create: { ...term },
        });
    });

    disciplines.forEach(async (discipline) => {
        await prisma.discipline.upsert({
            where: { name: discipline.name },
            update: {},
            create: { ...discipline },
        });
    });

    teachers.forEach(async (teacher) => {
        await prisma.teacher.upsert({
            where: { name: teacher.name },
            update: {},
            create: { ...teacher },
        });
    });

    teachersDisciplines.forEach(async (teacherDiscipline) => {
        await prisma.teacherDiscipline.upsert({
            where: { id: 1 },
            update: {},
            create: { ...teacherDiscipline },
        });
    });

    categories.forEach(async (category) => {
        await prisma.category.upsert({
            where: { name: category.name },
            update: {},
            create: { ...category },
        });
    });

    tests.forEach(async (test, index) => {
        await prisma.test.upsert({
            where: { id: index + 1 },
            update: {},
            create: { ...test },
        });
    });
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
