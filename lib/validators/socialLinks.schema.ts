import { z } from "zod";

const socialLinkSchema = z.object({
  url: z.string().url().or(z.string().length(0)),
  username: z.string().optional().or(z.string().length(1)),
  site: z.string(),
});

export const SocialLinksSchema = z.object({
  socialLinks: z.array(socialLinkSchema).min(0),
});
