import { getSEOSettings } from "@/lib/data/service";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function SEOSettingsPage() {
  const settings = await getSEOSettings();
  return (
    <SettingsForm
      title="SEO Settings"
      settings={settings}
      apiType="seo"
      fields={[
        { key: "title", label: "Page Title" },
        { key: "description", label: "Meta Description", rows: 3 },
        { key: "keywords", label: "Keywords" },
        { key: "ogImage", label: "Open Graph Image URL" },
        { key: "twitterHandle", label: "Twitter Handle" },
      ]}
    />
  );
}
