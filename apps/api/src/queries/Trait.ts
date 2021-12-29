import { getRepository } from 'typeorm';
import { Trait } from '../entities';

const selectAllTraits = async () => {
    return await getRepository(Trait).createQueryBuilder('trait').getMany();
};

const insertTraits = async (traits: Trait[]) => {
    return await getRepository(Trait)
        .createQueryBuilder()
        .insert()
        .into(Trait)
        .values(traits)
        .execute();
};

export const traitQuery = { selectAllTraits, insertTraits };
