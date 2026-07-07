import { ExperienceForm } from "@/components/admin/GenericForms";
import { requireEditMode } from "@/lib/auth/require-edit";

export default function NewExperiencePage() {
  requireEditMode("/admin/experiences");
  return <ExperienceForm />;
}
