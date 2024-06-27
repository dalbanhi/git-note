import { z } from "zod";

const socialLinkSchema = z
  .object({
    url: z.string().url().or(z.string().length(0)),
    username: z.string().optional().or(z.string().length(1)),
    site: z.string(),
  })
  .refine(
    (data) => {
      if (data.username && !data.url) {
        return false;
      }
      return true;
    },
    {
      message: "If you provide a username, you must also provide a URL.",
      path: ["url"],
    }
  );

export const SocialLinksSchema = z.object({
  socialLinks: z.array(socialLinkSchema).min(0),
});
