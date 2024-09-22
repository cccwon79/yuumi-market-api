import { Injectable, Logger } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { resolve } from "path";

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;
  private readonly logger = new Logger(SupabaseService.name);

  constructor() {
    // .env 파일 로드
    const envPath = resolve(__dirname, "../../../.env");
    const result = dotenv.config({ path: envPath });

    if (result.error) {
      this.logger.error(`Error loading .env file: ${result.error.message}`);
      throw new Error("환경 변수 로딩 실패");
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    this.logger.log(`SUPABASE_URL: ${supabaseUrl}`);
    this.logger.log(
      `SUPABASE_KEY: ${supabaseKey ? "설정됨" : "설정되지 않음"}`,
    );

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase 환경 변수가 설정되지 않았습니다.");
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
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
