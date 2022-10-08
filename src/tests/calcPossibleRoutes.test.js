import calcPossibleRoutes from "../utils/calcPossibleRoutes";

describe("calcPossibleRoutes function", () => {
  const graph = "AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1";

  it("returns 4 when called with E, D, max 4 stops and same route twice false", () => {
    expect([...calcPossibleRoutes(graph, "E", "D", 4)].length).toBe(4);
  });

  it("returns 5 when called with E, E, and same route twice false", () => {
    expect([...calcPossibleRoutes(graph, "E", "E")].length).toBe(5);
  });
});
