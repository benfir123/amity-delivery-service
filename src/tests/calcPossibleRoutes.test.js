describe("calcPossibleRoutes function", () => {
  const graph = "AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1";

  it("returns 4 when called with E-D, max 4 stops and same route false", () => {
    expect(calcPossibleRoutes(graph, "E", "D", 4)).toBe(4);
  });

  it("returns 5 when called with E-E and same route false", () => {
    expect(calcPossibleRoutes(graph, "E", "E")).toBe(5);
  });

  it("returns 29 when called with E-E, delivery cost < 20 and same route true", () => {
    expect(calcPossibleRoutes(graph, "E", "E", null, 20, true)).toBe(29);
  });
});
