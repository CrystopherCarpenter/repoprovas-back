// import app from '../src/app.js';
// import supertest from 'supertest';
// import { faker } from '@faker-js/faker';
// import { prisma } from '../src/database.js';

// describe('POST /tests', async () => {
//     beforeAll(async () => {
//         await prisma.$executeRaw`TRUNCATE TABLE tests;`;
//     });

//     it('returns 201 for valid params', async () => {
//         const body = {
//             name: faker.hacker.noun(),
//             pdfUrl: faker.internet.url(),
//             categoryId: faker.random.number({ min: 1, max: 4, precision: 1 }),
//             teacherDisciplineId: faker.random.number({
//                 min: 1,
//                 max: 23,
//                 precision: 1,
//             }),
//         };

//         const result = await supertest(app).post('/tests').send(body);
//         const status = result.status;

//         expect(status).toEqual(201);
//     });

//     afterAll(async () => {
//         await prisma.$disconnect();
//     });
// });
