import repoRepository from '../repositories/repoRepository.js';

async function getData() {
    const dataByTerm = await repoRepository.getDataByTerm();
    const dataByTeacher = await repoRepository.getDataByTeacher();
    const teachersData = await repoRepository.getTeachers();
    const disciplinesData = await repoRepository.getDisciplines();
    const testsByCategory = await repoRepository.getTestsByCategory();

    const teachers = teachersData.map((teacher) => teacher.name);
    const disciplines = disciplinesData.map((discipline) => discipline.name);

    return { dataByTeacher };
}

export default {
    getData,
};
