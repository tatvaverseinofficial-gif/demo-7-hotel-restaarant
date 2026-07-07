import { getExperiences } from "@/lib/data/service";
import { ExperiencesAdminClient } from "@/components/admin/GenericAdminClients";

export default async function ExperiencesPage() {
  const experiences = await getExperiences(false);
  return <ExperiencesAdminClient experiences={experiences} />;
}
