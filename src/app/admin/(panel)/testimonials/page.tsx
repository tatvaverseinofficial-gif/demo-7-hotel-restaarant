import { getTestimonials } from "@/lib/data/service";
import { TestimonialsAdminClient } from "@/components/admin/GenericAdminClients";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials(false);
  return <TestimonialsAdminClient testimonials={testimonials} />;
}
