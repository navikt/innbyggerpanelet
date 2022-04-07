import { Connection, EntityTarget, Repository } from 'typeorm';

export default abstract class BaseService<T> {
    protected repository: Repository<T>;

    constructor(db: Connection, target: EntityTarget<T>) {
        this.repository = db.getRepository(target);
    }

    abstract get(): Promise<T[] | undefined>;

    abstract getById(id: number | string): Promise<T | undefined>;

    abstract create(dto: T): Promise<T | undefined>;

    abstract update(id: number | string, dto: T): Promise<T | undefined>;

    abstract delete(id: number | string): Promise<void>;
}
