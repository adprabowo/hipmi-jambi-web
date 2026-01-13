import { db } from "@/db";
import { publications } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import PublicationsClient from "./PublicationsClient";

async function getPublications() {
  return await db
    .select()
    .from(publications)
    .where(eq(publications.published, true))
    .orderBy(desc(publications.createdAt));
}

export default async function PublicationsPage() {
  const allPublications = await getPublications();

  // Parse tags from JSON string
  const publicationsWithParsedTags = allPublications.map(pub => ({
    ...pub,
    tags: pub.tags ? JSON.parse(pub.tags) : []
  }));

  return <PublicationsClient publications={publicationsWithParsedTags} />;
}