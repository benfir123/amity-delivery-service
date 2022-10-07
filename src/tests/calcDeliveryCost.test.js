describe("calcDeliveryCost function", () => {
  const graph = "AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1";

  it("returns 4 when called with A-B-E", () => {
    expect(calcDeliveryCost(graph, "A-B-E")).toBe(4);
  });

  it("returns 10 when called with A-D", () => {
    expect(calcDeliveryCost(graph, "A-D")).toBe(10);
  });

  it("returns 8 when called with E-A-C-F", () => {
    expect(calcDeliveryCost(graph, "E-A-C-F")).toBe(8);
  });

  it("returns No Such Route when called with A-D-F", () => {
    expect(calcDeliveryCost(graph, "A-D-F")).toBe("No Such Route");
  });
});
