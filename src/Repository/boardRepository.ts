import fs from 'fs/promises';

export class BoardRepository {
  static async addBoard(
    userId: number,
    name: string,
    color: string,
    description?: string,
    createdAt?: string
  ) {
    const board = {
      userId,
      name,
      color,
      description,
      createdAt,
    };

    const jsonData = JSON.stringify(board, null, 2);

    fs.writeFile('board.json', jsonData);
  }
}
