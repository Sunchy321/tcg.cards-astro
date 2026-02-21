/// <reference types="@cloudflare/workers-types" />

/**
 * Cloudflare Workers environment variables type definition
 */
export interface Env {
  // Add your environment variables
  ENVIRONMENT?: string;
  API_KEY?: string;

  // KV namespace (if used)
  // MY_KV?: KVNamespace;

  // D1 database (if used)
  // DB?: D1Database;

  // R2 bucket (if used)
  // MY_BUCKET?: R2Bucket;

  // Durable Objects (if used)
  // MY_DO?: DurableObjectNamespace;
}

/**
 * API response type
 */
export interface ApiResponse<T = any> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * User type
 */
export interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
}
