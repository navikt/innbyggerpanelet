import { getRepository } from 'typeorm';
import { Criteria } from '../models/criteria/CriteriaEntity';

const selectAllCriteria = async () => {
    return await getRepository(Criteria).createQueryBuilder('criteria').getMany();
};

const insertCriteria = async (criteria: Criteria[]) => {
    return await getRepository(Criteria)
        .createQueryBuilder()
        .insert()
        .into(Criteria)
        .values(criteria)
        .execute();
};

export const criteriaQuery = { selectAllCriteria, insertCriteria };
