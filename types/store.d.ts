export interface Store {
  list(table: string): Promise<any[]>;
  get(table: string, id: string): Promise<any | null>;
  upsert(table: string, data: any): Promise<void>;
  remove(table: string, id: string): Promise<boolean>;
}
