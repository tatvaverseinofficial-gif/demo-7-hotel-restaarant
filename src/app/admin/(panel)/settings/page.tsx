import { getWebsiteSettings } from "@/lib/data/service";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function WebsiteSettingsPage() {
  const settings = await getWebsiteSettings();
  return (
    <SettingsForm
      title="Website Settings"
      settings={settings}
      apiType="website"
      fields={[
        { key: "hotelName", label: "Hotel Name" },
        { key: "tagline", label: "Tagline" },
        { key: "phone", label: "Phone" },
        { key: "email", label: "Email" },
        { key: "address", label: "Address", rows: 2 },
        { key: "workingHours", label: "Working Hours" },
        { key: "mapLat", label: "Map Latitude", type: "number" },
        { key: "mapLng", label: "Map Longitude", type: "number" },
        { key: "socialFacebook", label: "Facebook URL" },
        { key: "socialInstagram", label: "Instagram URL" },
        { key: "socialTwitter", label: "Twitter URL" },
        { key: "logo", label: "Logo URL" },
      ]}
    />
  );
}
