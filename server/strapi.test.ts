import { describe, expect, it } from "vitest";

describe("Strapi Connection Test", () => {
  it("should successfully connect to Strapi API with provided credentials", async () => {
    const strapiUrl = process.env.STRAPI_URL;
    const strapiToken = process.env.STRAPI_API_TOKEN;

    expect(strapiUrl).toBeDefined();
    expect(strapiToken).toBeDefined();

    // Test connection by fetching a simple endpoint
    const response = await fetch(`${strapiUrl}/api/priorites`, {
      headers: {
        Authorization: `Bearer ${strapiToken}`,
      },
    });

    expect(response.ok).toBe(true);
    
    const data = await response.json();
    expect(data).toBeDefined();
  });
});
