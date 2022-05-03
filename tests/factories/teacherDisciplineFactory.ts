import { prisma } from '../../src/database';

export default async function teacherDisciplineFactory() {
    const teachersDiscipline = await prisma.teacherDiscipline.findMany();
    return teachersDiscipline[0].id;
}
