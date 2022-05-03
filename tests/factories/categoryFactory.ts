import { prisma } from '../../src/database';

export default async function categoryFactory() {
    const category = await prisma.category.findMany();
    return category[0].id;
}
