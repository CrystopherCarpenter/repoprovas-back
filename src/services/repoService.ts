import repoRepository from '../repositories/repoRepository.js';

async function getData() {
    const dataByTerm = await repoRepository.getDataByTerm();
    const dataByTeacher = await repoRepository.getDataByTeacher();

    return { dataByTerm, dataByTeacher };
}

export default {
    getData,
};
