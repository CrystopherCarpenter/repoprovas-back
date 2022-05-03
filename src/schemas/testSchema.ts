import Joi from 'joi';
import { TestData } from '../services/testService.js';

export const testSchema = Joi.object<TestData>({
    name: Joi.string().required(),
    pdfUrl: Joi.string().uri().required(),
    categoryId: Joi.number().required(),
    teacherDisciplineId: Joi.number().required(),
});
