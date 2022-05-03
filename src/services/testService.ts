import testRepository from '../repositories/testRepository.js';

interface Filter {
    groupBy: 'disciplines' | 'teachers';
}

export interface TestData {
    name: string;
    pdfUrl: string;
    categoryId: number;
    teacherDisciplineId: number;
}

async function find(filter: Filter) {
    if (filter.groupBy === 'disciplines') {
        return testRepository.getTestsByDiscipline();
    } else if (filter.groupBy === 'teachers') {
        return testRepository.getTestsByTeachers();
    }
}

async function insert(testData: TestData) {
    await testRepository.insert(testData);

    return;
}

async function updateViews(testId: number) {
    await testRepository.updateViews(testId);

    return;
}

export default {
    find,
    insert,
    updateViews,
};
