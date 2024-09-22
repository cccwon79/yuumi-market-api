import { Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
    console.log("SUPABASE_KEY:", process.env.SUPABASE_KEY);

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
      throw new Error("Supabase 환경 변수가 설정되지 않았습니다.");
    }

    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    );
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  async select(table: string, query: any) {
    const { data, error } = await this.supabase.from(table).select(query);
    if (error) throw error;
    return data;
  }

  async insert(table: string, data: any) {
    const { data: result, error } = await this.supabase
      .from(table)
      .insert(data);
    if (error) throw error;
    return result;
  }

  async update(table: string, data: any, match: any) {
    const { data: result, error } = await this.supabase
      .from(table)
      .update(data)
      .match(match);
    if (error) throw error;
    return result;
  }

  async delete(table: string, match: any) {
    const { data, error } = await this.supabase
      .from(table)
      .delete()
      .match(match);
    if (error) throw error;
    return data;
  }
}
