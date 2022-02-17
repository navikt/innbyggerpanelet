import { Connection, Repository } from 'typeorm';
import { NotFoundError } from '../lib/errors/http/NotFoundError';
import { ServerErrorMessage } from '../lib/errors/messages/ServerErrorMessages';
import { Candidate } from '../models/candidate/CandidateEntity';
import BaseService from './BaseService';

export interface ICandidateSearch {
    where: {
        user: string | string[];
        insight: string | string[];
    };
    relations: string | string[];
}

export class CandidateService extends BaseService<Candidate> {
    private _database: Connection;
    private _candidateRepository: Repository<Candidate>;

    constructor(db: Connection) {
        super(db, Candidate);
        this._database = db;
        this._candidateRepository = this._database.getRepository(Candidate);
    }

    async get(): Promise<Candidate[]> {
        const candidates = await this._candidateRepository.find();
        if (candidates.length === 0) throw new NotFoundError({ message: ServerErrorMessage.notFound('Candidates')});
        
        return candidates;
    }

    async getById(id: number): Promise<Candidate> {
        throw new Error('Method not implemented.');
    }

    async search(queries: ICandidateSearch): Promise<Candidate[]> {
        const candidates = await this._candidateRepository.find({
            where: queries.where,
            relations: [queries.relations || []].flat(),
        });

        if (candidates.length === 0) throw new NotFoundError({ message: ServerErrorMessage.notFound('Candidates')});

        return candidates;
    }

    async create(dto: Candidate): Promise<Candidate> {
        const candidate = await this._candidateRepository.save(dto);

        return candidate;
    }

    async update(id: number, dto: Candidate): Promise<Candidate> {
        throw new Error('Method not implemented.');
    }

    async delete(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
