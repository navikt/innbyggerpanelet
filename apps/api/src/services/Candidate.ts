import { getRepository } from 'typeorm';
import { Candidate } from '../models/candidate/CandidateEntity';

// Returns candidates sorted after number of traits matching param
const selectSortedCandidatesByTraits = async (traitIds: string[]) => {
    return await getRepository(Candidate)
        .createQueryBuilder('candidate')
        .leftJoinAndSelect(
            'candidate.traits',
            'trait',
            'trait.id IN (:...traitIds)',
            { traitIds }
        )
        .orderBy('trait', 'DESC')
        .getMany();
};

const selectCandidateById = async (id: number) => {
    return await getRepository(Candidate)
        .createQueryBuilder('candidate')
        .where('candidate.id = :id', { id })
        .getOne();
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
    selectSortedCandidatesByTraits,
    selectCandidateById,
    insertCandidates,
    addTrait,
};
