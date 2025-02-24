// ...

export const env = createEnv({
  server: {
    // ...
   /**
    * Prisma Client がデータベースへ接続するためのデータベース接続先
    */
   DATABASE_URL: z.string().url(),
   /**
    * Prisma CLI がデータベースの操作をするためのデータベース接続先
    */
   DIRECT_URL: z.string().url(),
  },
  client: {
    /**
    * Supabase の URL
    */
   NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
   /**
    * Supabase の匿名キー
    */
   NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  },
  runtimeEnv: {
    // ...
   DATABASE_URL: process.env.DATABASE_URL,
   DIRECT_URL: process.env.DIRECT_URL,
   NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
   NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  // ...
});
