import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/login", "/signup", "/auth/"],
        disallow: [
          "/dashboard",
          "/dashboard/",
          "/onboarding",
          "/assessment",
          "/learning",
          "/advanced-assessment",
          "/projects",
          "/problem-solving",
          "/interview",
          "/resume",
          "/opportunities",
          "/applications",
          "/feedback",
          "/profile",
          "/settings",
          "/api/",
        ],
      },
    ],
  };
}
