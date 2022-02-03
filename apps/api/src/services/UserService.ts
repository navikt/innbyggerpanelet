import { Connection, FindManyOptions, Repository } from 'typeorm';
import { User } from '../models/user/UserEntity';
import BaseService from './BaseService';

export interface IUserSearch {
    phone?: string | string[];
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
            const users = await this._userRepository.find({
                where: queries,
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
