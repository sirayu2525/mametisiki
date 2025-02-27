import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.article.deleteMany(); // 既存データを削除（オプション）

  await prisma.article.createMany({
    data: Array.from({ length: 20 }, (_, i) => ({
      title: `記事${i + 1}`,
      description: `記事${i + 1}の概要`,
      content: `記事${i + 1}の詳細な内容です。`,
      publishedAt: new Date(Date.now() - i * 86400000), // 1日ずつ過去にする
      tags: i % 2 === 0 ? ["プログラミング", "Next.js"] : ["JavaScript", "TypeScript"],
      image: `https://source.unsplash.com/400x300/?technology,${i}`,
    })),
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
