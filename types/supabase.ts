// types/supabase.ts
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      request_logs: {
        Row: {
          id: string; // uuid
          request_id: string;
          fingerprint: string;
          user_id: string; // uuid referencing auth.users
          tool: string;
          moderation: Json;
          created_at: string; // timestamp with time zone
        };
        Insert: {
          id?: string;
          request_id: string;
          fingerprint: string;
          user_id: string;
          tool: string;
          moderation: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          request_id?: string;
          fingerprint?: string;
          user_id?: string;
          tool?: string;
          moderation?: Json;
          created_at?: string;
        };
      };
      flagged_logs: {
        Row: {
          id: string; // uuid
          request_id: string;
          fingerprint: string;
          user_id: string; // uuid referencing auth.users
          tool: string;
          input: string;
          output: string | null;
          moderation: Json;
          created_at: string; // timestamp with time zone
        };
        Insert: {
          id?: string;
          request_id: string;
          fingerprint: string;
          user_id: string;
          tool: string;
          input: string;
          output?: string | null;
          moderation: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          request_id?: string;
          fingerprint?: string;
          user_id?: string;
          tool?: string;
          input?: string;
          output?: string | null;
          moderation?: Json;
          created_at?: string;
        };
      };
      rate_limits: {
        Row: {
          id: string; // uuid
          user_id: string; // uuid referencing auth.users
          request_count: number;
          last_reset: string; // timestamp with time zone
        };
        Insert: {
          id?: string;
          user_id: string;
          request_count?: number;
          last_reset?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          request_count?: number;
          last_reset?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
  auth: {
    Tables: {
      users: {
        Row: {
          id: string; // uuid
          email: string | null;
          created_at: string; // timestamp
          [key: string]: any; // auth.users has many fields, this allows flexibility
        };
        Insert: never; // Managed by Supabase Auth
        Update: never; // Managed by Supabase Auth
      };
    };
  };
}