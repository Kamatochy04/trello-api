import fs from 'fs/promises';
import { BaseRepository } from '../abstractClass/Repository';
import { BoardType } from '../types/board.type';
import path from 'path';

export class BoardRepository implements BaseRepository<BoardType, BoardType> {
  private filePath: string;

  constructor() {
    this.filePath = path.join(process.cwd(), 'db', 'board.json');
    this.initializeDatabase().catch((err) => {
      console.error('Failed to initialize database:', err);
    });
  }
  update(id: number, data: Partial<BoardType>): Promise<BoardType | null> {
    console.log(id, data);
    throw new Error('Method not implemented.');
  }
  public async delete(id: number): Promise<boolean> {
    try {
      const boards = await this.getAll();
      const initialLength = boards.length;
      const updatedBoards = boards.filter((board) => board.id !== id);

      if (initialLength === updatedBoards.length) {
        console.log(`Board with id ${id} not found`);
        return false;
      }

      await fs.writeFile(this.filePath, JSON.stringify(updatedBoards, null, 2), 'utf-8');

      console.log(`Board with id ${id} deleted successfully`);
      return true;
    } catch (err) {
      console.error(`Error deleting board ${id}:`, err);
      return false;
    }
  }

  private async initializeDatabase(): Promise<void> {
    try {
      await fs.mkdir(path.dirname(this.filePath), { recursive: true });

      try {
        await fs.access(this.filePath);
      } catch {
        await fs.writeFile(this.filePath, '[]', 'utf-8');
        console.log('Created new board.json file');
      }
    } catch (err) {
      console.error('Database initialization error:', err);
      throw err;
    }
  }

  public async getAll(): Promise<BoardType[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as BoardType[];
    } catch (err) {
      console.error('Error reading file:', err);
      return [];
    }
  }

  public async getOne(id: number): Promise<BoardType | null> {
    try {
      const data = await this.getAll();

      return data.filter((item) => item.id === id)[0];
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async create(data: BoardType) {
    try {
      const boardes = await this.getAll();
      boardes.push({ ...data, id: 12 });

      await fs.writeFile(this.filePath, JSON.stringify(boardes));
    } catch (err) {
      console.log(err);
    }
  }
}
