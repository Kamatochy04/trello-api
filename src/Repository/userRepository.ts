import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import { UserType } from '../types/user.type';

export class UserRepository {
  private static async getAll(): Promise<UserType[]> {
    try {
      const data = await fs.readFile('output.json', 'utf-8');
      const jsonData = JSON.parse(data);
      return jsonData;
    } catch (error) {
      console.error('Error reading file:', error);
      return [];
    }
  }

  public static async savePersonalData(
    email: string,
    password: string,
    userName: string,
    role: string,
    id: number
  ): Promise<void> {
    const allData = await this.getAll();

    const haswPassword = await bcrypt.hash(password, 12);

    const adminObject = {
      id,
      email,
      password: haswPassword,
      userName,
      role,
    };

    allData.push(adminObject);

    const jsonData = JSON.stringify(allData, null, 2);

    fs.writeFile('output.json', jsonData);
  }

  public static async getById(id: number): Promise<UserType | undefined> {
    const allAdmins = await UserRepository.getAll();

    return allAdmins.filter((item) => item.id === id)[0];
  }

  public static async getByEmail(email: string): Promise<UserType | undefined> {
    const allAdmins = await UserRepository.getAll();

    return allAdmins.filter((item) => item.email === email)[0];
  }
}
