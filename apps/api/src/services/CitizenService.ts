import { validate } from 'class-validator';
import { Connection, Repository } from 'typeorm';
import { NotAcceptableError } from '../lib/errors/http/NotAcceptableError';
import { NotFoundError } from '../lib/errors/http/NotFoundError';
import { ServerErrorMessage } from '../lib/errors/messages/ServerErrorMessages';
import { Citizen } from '../models/citizen/CitizenEntity';
import BaseService from './BaseService';

export class CitizenService extends BaseService<Citizen> {
    private _database: Connection;
    private _citizenRepository: Repository<Citizen>;

    constructor(db: Connection) {
        super(db, Citizen);
        this._database = db;
        this._citizenRepository = this._database.getRepository(Citizen);
    }

    get(): Promise<Citizen[]> {
        throw new Error('Method not implemented.');
    }

    async getById(id: string | number): Promise<Citizen> {
        const citizen = await this._citizenRepository.findOne(id, { relations: ['criterias'] });
        if (!citizen) throw new NotFoundError({ message: ServerErrorMessage.notFound('Citizen') });
        return citizen;
    }

    async create(dto: Citizen): Promise<Citizen> {
        const errors = await validate(dto);
        if (errors.length > 0) throw new NotAcceptableError({ message: ServerErrorMessage.invalidData(errors) });
        return await this._citizenRepository.save(dto);
    }

    async update(id: string | number, dto: Citizen): Promise<Citizen> {
        const errors = await validate(dto);
        if (errors.length > 0) throw new NotAcceptableError({ message: ServerErrorMessage.invalidData(errors) });
        return await this._citizenRepository.save(dto);
    }

    delete(id: string | number): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async getPrioritizedCitizens(criteriaIds: string[]): Promise<Citizen[] | undefined> {
        if (criteriaIds.length === 0) {
            throw new NotFoundError({ message: ServerErrorMessage.invalidData([]) });
        }

        const citizens = await this._citizenRepository
            .createQueryBuilder('citizen')
            .select('citizen.id')
            .leftJoinAndSelect('citizen.criterias', 'criteria', 'criteria.id IN (:...criteriaIds)', { criteriaIds })
            .groupBy('citizen.id')
            .addGroupBy('criteria.id')
            .having('COUNT(criteria.id) > 0')
            // .orderBy('COUNT(criteria.id)', 'DESC') Why doesn't this work?
            .getMany();

        if (citizens.length === 0)
            throw new NotFoundError({ message: ServerErrorMessage.notFound('Prioritized citizens') });

        // Consider moving sort function somewhere else.
        citizens.sort((first, second) => {
            const firstLength = first.criterias.length;
            const secondLength = second.criterias.length;

            if (firstLength > secondLength) {
                return -1;
            } else if (firstLength < secondLength) {
                return 1;
            } else {
                return 0;
            }
        });

        return citizens;
    }

    async getCitizensWithExpirationDate(date: string): Promise<Citizen[] | undefined> {
        const citizens = await this._citizenRepository.find({ where: { expirationDate: date } });

        return citizens;
    }
}
