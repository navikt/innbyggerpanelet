import { EnumCandidateStatus } from '@innbyggerpanelet/api-interfaces';
import { plainToInstance } from 'class-transformer';
import { Connection, Repository } from 'typeorm';
import config from '../config';
import { BadRequestError } from '../lib/errors/http/BadRequestError';
import { NotFoundError } from '../lib/errors/http/NotFoundError';
import { ServerErrorMessage } from '../lib/errors/messages/ServerErrorMessages';
import kafka from '../loaders/kafka';
import { Candidate } from '../models/candidate/CandidateEntity';
import BaseService from './BaseService';
import { SmsService } from './SmsService';

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
        if (candidates.length === 0) throw new NotFoundError({ message: ServerErrorMessage.notFound('Candidates') });

        return candidates;
    }

    async getByUserId(id: string): Promise<Candidate[]> {
        const candidates = await this._candidateRepository.find({
            where: { citizen: id },
            relations: ['insight', 'insight.project']
        });
        if (candidates.length === 0) throw new NotFoundError({ message: ServerErrorMessage.notFound('Candidates') });

        return candidates;
    }

    async getByUserIdAndInsightId(insightId: string | number, citizenId: string | number): Promise<Candidate> {
        const candidate = await this._candidateRepository.findOne({
            where: { citizen: citizenId, insight: insightId },
            relations: [
                'insight',
                'insight.project',
                'insight.project.members',
                'insight.consents',
                'insight.consents.template'
            ]
        });
        if (!candidate) throw new NotFoundError({ message: ServerErrorMessage.notFound('Candidate') });

        return candidate;
    }

    async getById(id: number): Promise<Candidate> {
        throw new Error('Method not implemented.');
    }

    private async getClearCandidatesByInsightId(id: string): Promise<Candidate[]> {
        return await this._candidateRepository
            .createQueryBuilder('candidate')
            .leftJoinAndSelect('candidate.insight', 'insight', 'insight.id = :id', { id })
            // eslint-disable-next-line quotes
            .where("(candidate.status = 'ACCEPTED' OR candidate.status = 'COMPLETED') AND insight.id = :id", { id })
            .leftJoinAndSelect('candidate.citizen', 'citizen')
            .getMany();
    }

    private async getAnonymizedCandidatesByInsightId(id: string): Promise<Candidate[]> {
        return await this._candidateRepository
            .createQueryBuilder('candidate')
            .leftJoinAndSelect('candidate.insight', 'insight', 'insight.id = :id', { id })
            // eslint-disable-next-line quotes
            .where("(candidate.status != 'ACCEPTED' AND candidate.status != 'COMPLETED') AND insight.id = :id", { id })
            .getMany();
    }

    async getCandidatesByInsightId(id: string): Promise<Candidate[]> {
        const clearCandidates = await this.getClearCandidatesByInsightId(id);
        const anonymizedCandidates = await this.getAnonymizedCandidatesByInsightId(id);
        const candidates = [...clearCandidates, ...anonymizedCandidates];

        if (candidates.length === 0) throw new NotFoundError({ message: ServerErrorMessage.notFound('Candidates') });

        return candidates;
    }

    async search(queries: ICandidateSearch): Promise<Candidate[]> {
        const candidates = await this._candidateRepository.find({
            where: queries.where,
            relations: [queries.relations || []].flat()
        });

        if (candidates.length === 0) throw new NotFoundError({ message: ServerErrorMessage.notFound('Candidates') });

        return candidates;
    }

    async create(dto: Candidate): Promise<Candidate> {
        const candidate = await this._candidateRepository.save(dto);

        if (config.backend.prod) {
            const smsService = new SmsService(kafka);
            smsService.send({
                birthNumber: candidate.citizen.pnr,
                message: 'Du har en melding om innsiktsarbeid på innbyggerpanelet.'
            });
        }

        return candidate;
    }

    async update(id: number, dto: Candidate): Promise<Candidate> {
        throw new Error('Method not implemented.');
    }

    async accept(insightId: string | number, citizenId: string): Promise<Candidate> {
        const update = await this._candidateRepository
            .createQueryBuilder()
            .update(Candidate)
            .set({ status: EnumCandidateStatus.Accepted, hasConsented: true })
            .where('citizen = :citizenId AND insight = :insightId', { citizenId, insightId })
            .execute();

        const candidate: Candidate = plainToInstance(Candidate, update);

        if (!candidate) throw new BadRequestError({ message: ServerErrorMessage.unexpected() });

        return candidate;
    }

    async decline(insightId: string | number, citizenId: string): Promise<Candidate> {
        const update = await this._candidateRepository
            .createQueryBuilder()
            .update(Candidate)
            .set({ status: EnumCandidateStatus.Declined, hasConsented: false })
            .where('citizen = :citizenId AND insight = :insightId', { citizenId, insightId })
            .execute();

        const candidate: Candidate = plainToInstance(Candidate, update);

        if (!candidate) throw new BadRequestError({ message: ServerErrorMessage.unexpected() });

        return candidate;
    }

    async delete(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
