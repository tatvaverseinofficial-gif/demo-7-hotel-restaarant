import { getHomepageSettings } from "@/lib/data/service";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function HomepageSettingsPage() {
  const settings = await getHomepageSettings();
  return (
    <SettingsForm
      title="Homepage Settings"
      settings={settings}
      apiType="homepage"
      fields={[
        { key: "heroTitle", label: "Hero Title" },
        { key: "heroSubtitle", label: "Hero Subtitle" },
        { key: "heroImage", label: "Hero Image URL" },
        { key: "welcomeTitle", label: "Welcome Title" },
        { key: "welcomeText", label: "Welcome Text", rows: 3 },
        { key: "aboutTitle", label: "About Title" },
        { key: "aboutText", label: "About Text", rows: 3 },
        { key: "heritageText", label: "Heritage Text", rows: 3 },
        { key: "missionText", label: "Mission Text", rows: 3 },
      ]}
    />
  );
}
