import { validate } from 'class-validator';
import { Connection, FindOperator, ILike, Repository } from 'typeorm';
import { NotAcceptableError } from '../lib/errors/http/NotAcceptableError';
import { NotFoundError } from './../lib/errors/http/NotFoundError';
import { ServerErrorMessage } from './../lib/errors/messages/ServerErrorMessages';
import { ConsentTemplate } from './../models/consentTemplate/ConsentTemplateEntity';
import BaseService from './BaseService';

export interface IConsentTemplateSearch {
    where: {
        title?: string | string[] | FindOperator<string | string[]>;
    };
    relations: string | string[];
}

export class ConsentTemplateService extends BaseService<ConsentTemplate> {
    private _database: Connection;
    private _consentRepository: Repository<ConsentTemplate>;

    constructor(db: Connection) {
        super(db, ConsentTemplate);
        this._database = db;
        this._consentRepository = this._database.getRepository(ConsentTemplate);
    }

    get(): Promise<ConsentTemplate[]> {
        throw new Error('Method not implemented.');
    }

    async search(queries: IConsentTemplateSearch): Promise<ConsentTemplate[]> {
        if (queries.where && queries.where.title) queries.where.title = ILike(queries.where.title);

        const consentTemplates = await this._consentRepository.find({
            where: queries.where,
            relations: [queries.relations || []].flat()
        });

        if (!consentTemplates.length)
            throw new NotFoundError({ message: ServerErrorMessage.notFound('ConsentTemplates') });

        return consentTemplates;
    }

    async getById(id: string | number): Promise<ConsentTemplate> {
        return await this._consentRepository.findOne(id);
    }

    async create(dto: ConsentTemplate): Promise<ConsentTemplate> {
        const errors = await validate(dto);
        if (errors.length > 0) throw new NotAcceptableError({ message: ServerErrorMessage.invalidData(errors) });

        const consentTemplate = await this._consentRepository.save(dto);
        return consentTemplate;
    }

    async update(id: string | number, dto: ConsentTemplate): Promise<ConsentTemplate> {
        const errors = await validate(dto);
        if (errors.length > 0) throw new NotAcceptableError({ message: ServerErrorMessage.invalidData(errors) });

        const consentTemplate = await this._consentRepository.save({ ...dto, version: dto.version++ });
        return consentTemplate;
    }

    delete(id: string | number): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
