"use strict";
// import fs from 'fs/promises';
// import { BaseRepository } from '../abstractClass/Repository';
// import { BoardType } from '../types/board.type';
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardRepository = void 0;
// export class BoardRepository implements BaseRepository<BoardType, BoardType> {
//   async getAll(): Promise<BoardType[]> {
//     try {
//       const data = await fs.readFile('db/board.json');
//       console.log(data);
//       return null;
//     } catch (err) {
//       console.log(err);
//       return null;
//     }
//   }
//   getOne(id: string): Promise<BoardType | null> {
//     throw new Error('Method not implemented.');
//   }
//   create(data: BoardType): Promise<BoardType> {
//     throw new Error('Method not implemented.');
//   }
//   update(id: string, data: Partial<BoardType>): Promise<BoardType | null> {
//     throw new Error('Method not implemented.');
//   }
//   delete(id: string): Promise<boolean> {
//     throw new Error('Method not implemented.');
//   }
// }
class BoardRepository {
}
exports.BoardRepository = BoardRepository;
