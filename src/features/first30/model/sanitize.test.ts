import { describe, expect, it } from "vitest";
import { sanitizePersisted } from "./sanitize";

describe("sanitizePersisted", () => {
  it("keeps valid saved progress", () => {
    const saved = {
      activeCity: "milan",
      profiles: { milan: { city: "milan", arrivalDate: "2026-09-27", nonEu: true } },
      resolutions: { milan: { "tax-code": "done", "residence-permit": "skipped" } },
      stepChecks: { milan: { "tax-code": [0, 2] } },
      budgets: { milan: { rent: 800 } },
    };
    expect(sanitizePersisted(saved)).toEqual(saved);
  });

  it("drops anything it does not recognise instead of crashing", () => {
    const result = sanitizePersisted({
      activeCity: "paris",
      profiles: { milan: { city: "milan", arrivalDate: "<script>" }, rome: {} },
      resolutions: null,
      stepChecks: { milan: { "tax-code": "oops", __proto__: [1] } },
      budgets: { milan: { rent: -5, food: Number.NaN, fun: 120 } },
    });
    expect(result).toEqual({
      profiles: {},
      resolutions: {},
      stepChecks: { milan: {} },
      budgets: { milan: { fun: 120 } },
    });
  });

  it("ignores values that are not objects at all", () => {
    expect(sanitizePersisted("garbage")).toEqual({});
    expect(sanitizePersisted(null)).toEqual({});
  });
});
