import app from '../src/app';
import supertest from 'supertest';
import { prisma } from '../src/database';
import * as userFactory from './factories/userFactory';
import teacherDisciplineFactory from './factories/teacherDisciplineFactory';
import categoryFactory from './factories/categoryFactory';
import * as testFactory from './factories/testFactory';

describe('POST /sign-up', () => {
    beforeEach(async () => {
        dropTable();
    });

    afterAll(async () => {
        disconnect();
    });

    it('returns 201 for a valid user', async () => {
        const newUser = userFactory.newUser();
        const { status } = await supertest(app).post('/sign-up').send(newUser);
        const user = await prisma.user.findUnique({
            where: {
                email: newUser.email,
            },
        });

        expect(status).toEqual(201);
        expect(user).not.toBeNull();
    });

    it('returns 409 for an already created valid user', async () => {
        const user = await createUser();

        const { status } = await supertest(app).post('/sign-up').send(user);

        expect(status).toEqual(409);
    });

    it('returns 422 for an empty user', async () => {
        const user = {};

        const { status } = await supertest(app).post('/sign-up').send(user);

        expect(status).toEqual(422);
    });
});

describe('POST /sign-in', () => {
    beforeEach(async () => {
        dropTable();
    });

    afterAll(async () => {
        disconnect();
    });

    it('returns 200 for a valid user', async () => {
        const user = await createUser();

        const { status, body } = await supertest(app)
            .post('/sign-in')
            .send(user);

        expect(status).toEqual(200);
        expect(body.token.length).toBeGreaterThan(0);
    });

    it('returns 422 for an user with empty email', async () => {
        const user = await createUser();

        const { status } = await supertest(app)
            .post('/sign-in')
            .send({ ...user, email: '' });

        expect(status).toEqual(422);
    });

    it('returns 422 for an user with empty password', async () => {
        const user = await createUser();

        const { status } = await supertest(app)
            .post('/sign-in')
            .send({ ...user, password: '' });

        expect(status).toEqual(422);
    });

    it('returns 401 for an user with wrong email', async () => {
        const user = await createUser();

        const { status } = await supertest(app)
            .post('/sign-in')
            .send({ ...user, email: 'wrongemail@email.com' });

        expect(status).toEqual(401);
    });

    it('returns 401 for an user with wrong password', async () => {
        const user = await createUser();

        const { status } = await supertest(app)
            .post('/sign-in')
            .send({ ...user, password: 'wrongpassword123' });

        expect(status).toEqual(401);
    });
});

describe('GET /tests', () => {
    beforeEach(async () => {
        dropTable();
    });

    afterAll(async () => {
        disconnect();
    });

    it('returns 200 for valid token and parameter', async () => {
        const token = await signIn(expect);

        const { status, body } = await supertest(app)
            .get(`/tests?groupBy=disciplines`)
            .set('Authorization', token);

        expect(status).toEqual(200);
        expect(body.tests.length).toBeGreaterThan(0);
    });

    it('returns 200 for valid token and parameter', async () => {
        const token = await signIn(expect);

        const { status, body } = await supertest(app)
            .get(`/tests?groupBy=teachers`)
            .set('Authorization', token);

        expect(status).toEqual(200);
        expect(body.tests.length).toBeGreaterThan(0);
    });

    it('returns 401 for not sent token', async () => {
        await signIn(expect);

        const { status } = await supertest(app).get('/tests?');
        expect(status).toEqual(401);
    });

    it('returns 401 for invalid token', async () => {
        await signIn(expect);

        const { status } = await supertest(app)
            .get('/tests?')
            .set('Authorization', '11235813');
        expect(status).toEqual(401);
    });

    it('returns 400 for empty parameter', async () => {
        const token = await signIn(expect);

        const { status } = await supertest(app)
            .get('/tests?')
            .set('Authorization', token);

        expect(status).toEqual(400);
    });

    it('returns 400 for a parameter with invalid value', async () => {
        const token = await signIn(expect);

        const { status } = await supertest(app)
            .get('/tests?groupBy=wrongparameter')
            .set('Authorization', token);

        expect(status).toEqual(400);
    });
});

describe('POST /tests', () => {
    beforeEach(async () => {
        dropTable();
    });

    afterAll(async () => {
        disconnect();
    });

    it('returns 201 for a valid token and body', async () => {
        const token = await signIn(expect);

        const teacherDisciplineId = await teacherDisciplineFactory();
        const categoryId = await categoryFactory();

        const body = await testFactory.testBodyFactory(
            categoryId,
            teacherDisciplineId
        );

        const { status } = await supertest(app)
            .post(`/tests`)
            .set('Authorization', token)
            .send(body);

        expect(status).toEqual(201);
    });

    it('returns 422 for invalid body name value', async () => {
        const token = await signIn(expect);

        const teacherDisciplineId = await teacherDisciplineFactory();
        const categoryId = await categoryFactory();

        const body = await testFactory.testBodyFactory(
            categoryId,
            teacherDisciplineId
        );

        const { status } = await supertest(app)
            .post(`/tests`)
            .set('Authorization', token)
            .send({ ...body, name: ['invalid name format', 123, true] });

        expect(status).toEqual(422);
    });

    it('returns 422 for invalid body pdfUrl value', async () => {
        const token = await signIn(expect);

        const teacherDisciplineId = await teacherDisciplineFactory();
        const categoryId = await categoryFactory();

        const body = await testFactory.testBodyFactory(
            categoryId,
            teacherDisciplineId
        );

        const { status } = await supertest(app)
            .post(`/tests`)
            .set('Authorization', token)
            .send({ ...body, pdfUrl: 'invalidUrlFormat' });

        expect(status).toEqual(422);
    });

    it('returns 422 for an empty body', async () => {
        const token = await signIn(expect);

        const body = {};

        const { status } = await supertest(app)
            .post(`/tests`)
            .set('Authorization', token)
            .send(body);

        expect(status).toEqual(422);
    });

    it('returns 401 for not sent token', async () => {
        await signIn(expect);

        const { status } = await supertest(app).post('/tests');
        expect(status).toEqual(401);
    });

    it('returns 401 for invalid token', async () => {
        await signIn(expect);

        const { status } = await supertest(app)
            .post('/tests')
            .set('Authorization', '11235813');
        expect(status).toEqual(401);
    });
});

describe('PUT /tests/:testId', () => {
    beforeEach(async () => {
        dropTable();
    });

    afterAll(async () => {
        disconnect();
    });

    it('returns 200 for valid parameter', async () => {
        const token = await signIn(expect);

        const teacherDisciplineId = await teacherDisciplineFactory();
        const categoryId = await categoryFactory();

        const body = await testFactory.testBodyFactory(
            categoryId,
            teacherDisciplineId
        );

        const testId = await testFactory.testIdFactory(body);

        const { status } = await supertest(app).put(`/tests/${testId}`);

        expect(status).toEqual(200);
    });
});

async function signIn(expect: jest.Expect) {
    const user = await createUser();

    const { status, body } = await supertest(app).post('/sign-in').send(user);

    expect(status).toEqual(200);
    expect(body.token.length).toBeGreaterThan(0);

    return `Bearer ${body.token}`;
}

async function createUser() {
    return await userFactory.createUser(userFactory.newUser());
}

async function disconnect() {
    await prisma.$disconnect();
}

async function dropTable() {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE tests CASCADE;`;
}
