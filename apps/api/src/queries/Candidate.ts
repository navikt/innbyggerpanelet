import { getRepository } from 'typeorm';
import { Candidate } from '../entities';

const selectAllCandidates = async () => {
    return await getRepository(Candidate)
        .createQueryBuilder('candidate')
        .getMany();
};

const insertCandidates = async (candidates: Candidate[]) => {
    return await getRepository(Candidate)
        .createQueryBuilder()
        .insert()
        .into(Candidate)
        .values(candidates)
        .execute();
};

// Replace with all encompassing update function
const addTrait = async (candidateID: number, traitID: number) => {
    return await getRepository(Candidate)
        .createQueryBuilder()
        .relation(Candidate, 'traits')
        .of(candidateID)
        .add(traitID);
};

export const candidateQuery = {
    selectAllCandidates,
    insertCandidates,
    addTrait,
};
