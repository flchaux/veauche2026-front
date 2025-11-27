import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Strapi CMS routes
  strapi: router({
    heroSection: publicProcedure.query(async () => {
      const { getHeroSection } = await import("./strapi");
      return getHeroSection();
    }),
    presentationCandidat: publicProcedure.query(async () => {
      const { getPresentationCandidat } = await import("./strapi");
      return getPresentationCandidat();
    }),
    priorites: publicProcedure.query(async () => {
      const { getPriorites } = await import("./strapi");
      return getPriorites();
    }),
    sectionPriorites: publicProcedure.query(async () => {
      const { getSectionPriorites } = await import("./strapi");
      return getSectionPriorites();
    }),
    methodesGestion: publicProcedure.query(async () => {
      const { getMethodesGestion } = await import("./strapi");
      return getMethodesGestion();
    }),
    methodeSection: publicProcedure.query(async () => {
      const { getMethodeSection } = await import("./strapi");
      return getMethodeSection();
    }),
    membresEquipe: publicProcedure.query(async () => {
      const { getMembresEquipe } = await import("./strapi");
      return getMembresEquipe();
    }),
    membresEquipeCles: publicProcedure.query(async () => {
      const { getMembresEquipe } = await import("./strapi");
      return getMembresEquipe(true);
    }),
    sectionEquipe: publicProcedure.query(async () => {
      const { getSectionEquipe } = await import("./strapi");
      return getSectionEquipe();
    }),
    photosVille: publicProcedure.query(async () => {
      const { getPhotosVille } = await import("./strapi");
      return getPhotosVille();
    }),
    sectionFormulaire: publicProcedure.query(async () => {
      const { getSectionFormulaire } = await import("./strapi");
      return getSectionFormulaire();
    }),
    footer: publicProcedure.query(async () => {
      const { getFooter } = await import("./strapi");
      return getFooter();
    }),
  }),
});

export type AppRouter = typeof appRouter;
