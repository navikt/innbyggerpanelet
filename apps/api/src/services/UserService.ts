import { validate } from 'class-validator';
import { Connection, FindOperator, ILike, Repository } from 'typeorm';
import { NotAcceptableError } from '../lib/errors/http/NotAcceptableError';
import { NotFoundError } from '../lib/errors/http/NotFoundError';
import { ServerErrorMessage } from '../lib/errors/messages/ServerErrorMessages';
import { User } from '../models/user/UserEntity';
import BaseService from './BaseService';

export interface IUserSearch {
    where: {
        name?: string | string[] | FindOperator<string | string[]>;
        role: string;
    };
    relations: string | string[];
}

export class UserService extends BaseService<User> {
    private _database: Connection;
    private _userRepository: Repository<User>;

    constructor(db: Connection) {
        super(db, User);
        this._database = db;
        this._userRepository = this._database.getRepository(User);
    }

    async get(): Promise<User[] | undefined> {
        const users = await this._userRepository.createQueryBuilder('user').getMany();

        if (users.length === 0) throw new NotFoundError({ message: ServerErrorMessage.notFound('Users') });

        return users;
    }

    async search(queries: IUserSearch): Promise<User[] | undefined> {
        // TODO: Make general solution for all special fields
        // Case insensitive string search
        if (queries.where && queries.where.name) queries.where.name = ILike(queries.where.name);

        const users = await this._userRepository.find({
            where: queries.where,
            relations: [queries.relations || []].flat()
        });

        if (users.length === 0) throw new NotFoundError({ message: ServerErrorMessage.notFound('Users') });

        return users;
    }

    async getById(id: string): Promise<User | undefined> {
        const user = await this._userRepository.findOne(id, { relations: ['criterias'] });

        if (!user) throw new NotFoundError({ message: ServerErrorMessage.notFound('User') });

        return user;
    }

    async create(dto: User): Promise<User | undefined> {
        const errors = await validate(dto);
        if (errors.length > 0) throw new NotAcceptableError({ message: ServerErrorMessage.invalidData(errors) });
        return await this._userRepository.save(dto);
    }

    async update(id: string, dto: User): Promise<User | undefined> {
        const errors = await validate(dto);
        if (errors.length > 0) throw new NotAcceptableError({ message: ServerErrorMessage.invalidData(errors) });
        return await this._userRepository.save(dto);
    }

    async delete(id: string): Promise<void> {
        throw new Error('not implemented');
    }
}
