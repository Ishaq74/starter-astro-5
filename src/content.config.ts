import { defineCollection, z } from "astro:content";
import { getDrizzle } from "@database/drizzle";

// --- liste explicite de tous les schémas disponibles
import * as contact from "@database/schema/contact";
import * as faqs from "@database/schema/faqs";
import * as formations from "@database/schema/formations";
import * as gallery from "@database/schema/gallery";
import * as reservations from "@database/schema/reservations";
import * as services from "@database/schema/services";
import * as siteidentity from "@database/schema/siteidentity";
import * as team from "@database/schema/team";
import * as testimonials from "@database/schema/testimonials";

// Connexion via util existant; si indisponible → loaders retournent []
let dbPromise: Promise<any> | null = null;
async function getDb() {
  try {
    if (!dbPromise) dbPromise = getDrizzle();
    return await dbPromise;
  } catch (e) {
    console.warn("[content.config] DB indisponible:", (e as any)?.message);
    return null;
  }
}

// --- exporte explicitement chaque collection (noms connus)
export const collections = {
  services: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      iconName: z.string().optional(),
      imagePath: z.string().optional(),
      features: z.array(z.string()),
      price: z.string(),
      sortOrder: z.number().optional(),
    }),
    loader: async () => {
      const d = await getDb();
      if (!d) return [];
      try {
        const rows = await d.select().from((services as any).services);
        return rows.map((r: any) => ({
          ...r,
          features: r.features ? safeJson(r.features) : [],
          id: String(r.slug ?? r.id),
        }));
      } catch (e) {
        console.warn("services loader error", (e as any).message); return [];
      }
    },
  }),
  siteIdentity: defineCollection({
    schema: z.object({}).passthrough(),
    loader: async () => {
      const d = await getDb();
      if (!d) return [];
      try {
        const rows = await d.select().from((siteidentity as any).siteIdentity);
        return rows.map((r: any) => ({ ...r, id: String(r.slug ?? r.id) }));
      } catch (e) {
        console.warn("siteIdentity loader error", (e as any).message); return [];
      }
    },
  }),
  siteSettings: defineCollection({
    schema: z.object({
      site_name: z.string().optional(),
      site_description: z.string().optional(),
      contact_email: z.string().optional(),
      contact_phone: z.string().optional(),
      contact_address: z.string().optional(),
      social_instagram: z.string().optional(),
      social_facebook: z.string().optional(),
      social_tiktok: z.string().optional(),
      business_hours: z.string().optional(),
      smtp_host: z.string().optional(),
      smtp_port: z.number().optional(),
      smtp_username: z.string().optional(),
      smtp_password: z.string().optional(),
      smtp_secure: z.number().optional(),
      smtp_from_name: z.string().optional(),
    }).passthrough(),
    loader: async () => {
      const d = await getDb();
      if (!d) return [];
      try {
  const rows = await d.select().from((siteidentity as any).siteSettings);
  return rows.map((r: any) => ({ ...r, id: String(r.id) }));
      } catch (e) {
        console.warn("siteSettings loader error", (e as any).message); return [];
      }
    },
  }),
  formations: defineCollection({
    schema: z.object({
      title: z.string(),
      subtitle: z.string(),
      description: z.string(),
      level: z.string(),
      duration: z.string(),
      participants: z.string(),
      price: z.string(),
      features: z.array(z.string()),
      imagePath: z.string().optional(),
      badge: z.string(),
      sortOrder: z.number().optional(),
    }),
    loader: async () => {
      const d = await getDb();
      if (!d) return [];
      try {
        const rows = await d.select().from((formations as any).formations);
        return rows.map((r: any) => ({
          ...r,
          features: r.features ? safeJson(r.features) : [],
          imagePath: r.image_path,
          id: String(r.slug ?? r.id),
        }));
      } catch (e) { console.warn("formations loader error", (e as any).message); return [];}    
    },
  }),
  faqs: defineCollection({
    schema: z.object({
      question: z.string(),
      answer: z.string(),
      category: z.string(),
      sortOrder: z.number().optional(),
      isActive: z.boolean(),
    }),
    loader: async () => {
      const d = await getDb();
      if (!d) return [];
      try {
  const rows = await d.select().from((faqs as any).faqs);
  return rows.map((r: any) => ({ ...r, isActive: !!r.is_active, id: String(r.id) }));
      } catch (e) { console.warn("faqs loader error", (e as any).message); return [];}    
    },
  }),
  gallery: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      category: z.string(),
      serviceId: z.number().optional(),
      images: z.array(z.string()),
      featuredImage: z.string(),
      isFeatured: z.boolean(),
      sortOrder: z.number().optional(),
    }),
    loader: async () => {
      const d = await getDb();
      if (!d) return [];
      try {
        const rows = await d.select().from((gallery as any).gallery);
        return rows.map((r: any) => ({
          ...r,
          images: r.images ? safeJson(r.images) : [],
          featuredImage: r.featured_image,
          isFeatured: !!r.is_featured,
          serviceId: r.service_id,
          id: String(r.slug ?? r.id),
        }));
      } catch (e) { console.warn("gallery loader error", (e as any).message); return [];}    
    },
  }),
  reservations: defineCollection({
    schema: z.object({}).passthrough(),
    loader: async () => {
      const d = await getDb();
      if (!d) return [];
  try { const rows = await d.select().from((reservations as any).reservations); return rows.map((r: any)=>({ ...r, id:String(r.id) })); }
      catch (e) { console.warn("reservations loader error", (e as any).message); return [];}    
    },
  }),
  contact: defineCollection({
    schema: z.object({}).passthrough(),
    loader: async () => {
      const d = await getDb();
      if (!d) return [];
  try { const rows = await d.select().from((contact as any).contact); return rows.map((r: any)=>({ ...r, id:String(r.id) })); }
      catch (e) { console.warn("contact loader error", (e as any).message); return [];}    
    },
  }),
  teamMembers: defineCollection({
    schema: z.object({
      name: z.string(),
      role: z.string(),
      speciality: z.string(),
      imagePath: z.string(),
      experience: z.string(),
      description: z.string(),
      certifications: z.array(z.string()),
      achievements: z.array(z.string()),
      social: z.object({
        instagram: z.string(),
        linkedin: z.string(),
        email: z.string(),
      }),
      sortOrder: z.number().optional(),
    }),
    loader: async () => {
      const d = await getDb();
      if (!d) return [];
      try {
        const rows = await d.select().from((team as any).teamMembers);
        return rows.map((r: any) => ({
          ...r,
          certifications: r.certifications ? safeJson(r.certifications) : [],
          achievements: r.achievements ? safeJson(r.achievements) : [],
          social: {
            instagram: r.social_instagram || "",
            linkedin: r.social_linkedin || "",
            email: r.social_email || "",
          },
          imagePath: r.image_path,
          id: String(r.slug ?? r.id),
        }));
      } catch (e) { console.warn("teamMembers loader error", (e as any).message); return [];}    
    },
  }),
  testimonials: defineCollection({
    schema: z.object({
      name: z.string(),
      role: z.string(),
      imagePath: z.string(),
      rating: z.number(),
      text: z.string(),
      service: z.string(),
      sortOrder: z.number().optional(),
    }),
    loader: async () => {
      const d = await getDb();
      if (!d) return [];
      try {
  const rows = await d.select().from((testimonials as any).testimonials);
  return rows.map((r: any) => ({ ...r, imagePath: r.image_path, id: String(r.slug ?? r.id) }));
      } catch (e) { console.warn("testimonials loader error", (e as any).message); return [];}    
    },
  }),
};

// Utilitaire JSON safe
function safeJson(value: any) {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string" || !value.trim()) return [];
  try { return JSON.parse(value); } catch { return []; }
}
