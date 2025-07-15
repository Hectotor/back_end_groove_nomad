import { getAirtableBase, tables } from './config';
import { Record, FieldSet } from 'airtable';

export interface AirtableUser {
  id: string;
  fields: FieldSet;
}

export class AirtableService {
  private static instance: AirtableService;
  private constructor() {}

  static getInstance() {
    if (!AirtableService.instance) {
      AirtableService.instance = new AirtableService();
    }
    return AirtableService.instance;
  }

  private async getBase() {
    return await getAirtableBase();
  }

  async getUserByEmail(email: string): Promise<AirtableUser | null> {
    try {
      const base = await this.getBase();
      const records = await base(tables.users)
        .select({
          filterByFormula: `{email} = "${email}"`,
        })
        .firstPage();

      if (records.length > 0) {
        return {
          id: records[0].id,
          fields: records[0].fields
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  async createUser(fields: FieldSet): Promise<AirtableUser | null> {
    try {
      const base = await this.getBase();
      const records = await base(tables.users).create([
        {
          fields,
        },
      ]);

      if (records.length > 0) {
        return {
          id: records[0].id,
          fields: records[0].fields
        };
      }
      return null;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  async updateUser(id: string, fields: FieldSet): Promise<AirtableUser | null> {
    try {
      const base = await this.getBase();
      const records = await base(tables.users).update([
        {
          id,
          fields,
        },
      ]);

      if (records.length > 0) {
        return {
          id: records[0].id,
          fields: records[0].fields
        };
      }
      return null;
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  }
}
