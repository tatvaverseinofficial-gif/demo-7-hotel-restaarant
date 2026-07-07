import { TestimonialForm } from "@/components/admin/GenericForms";
import { requireEditMode } from "@/lib/auth/require-edit";

export default function NewTestimonialPage() {
  requireEditMode("/admin/testimonials");
  return <TestimonialForm />;
}
