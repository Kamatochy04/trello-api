export abstract class BaseRepository<T, CreateDto, UpdateDto = Partial<CreateDto>> {
  abstract getAll(): Promise<T[]>;
  abstract getOne(id: number): Promise<T | null>;
  abstract create(data: CreateDto): void;
  abstract update(id: number, data: UpdateDto): Promise<T | null>;
  abstract delete(id: number): Promise<boolean>;
}
