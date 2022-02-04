import {
    Connection,
    FindManyOptions,
    FindOperator,
    ILike,
    Repository,
} from 'typeorm';
import { User } from '../models/user/UserEntity';
import BaseService from './BaseService';

export interface IUserSearch {
    where: {
        name?: string | string[] | FindOperator<string | string[]>;
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
        try {
            const users = await this._userRepository
                .createQueryBuilder('user')
                .getMany();

            return users;
        } catch (err) {
            console.error(err);
        }
    }

    async search(queries: IUserSearch): Promise<User[] | undefined> {
        try {
            // TODO: Make general solution for all special fields
            // Case insensitive string search
            if (queries.where && queries.where.name)
                queries.where.name = ILike(queries.where.name);

            const users = await this._userRepository.find({
                where: queries.where,
                relations: [queries.relations || []].flat(),
            });

            return users;
        } catch (err) {
            console.error(err);
        }
    }

    async getById(id: number): Promise<User | undefined> {
        throw new Error('not implemented');
    }

    async create(dto: User): Promise<User | undefined> {
        try {
            const user = await this._userRepository.save(dto);

            return user;
        } catch (err) {
            console.error(err);
        }
    }

    async update(id: number, dto: User): Promise<User | undefined> {
        throw new Error('not implemented');
    }

    async delete(id: number): Promise<void> {
        throw new Error('not implemented');
    }
}
