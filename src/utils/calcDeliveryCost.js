const calcDeliveryCost = (graph, route) => {
  const graphArr = graph.split(", ");
  const routeArr = route.split("-");
  let totalCost = 0;

  for (let i = 0; i < routeArr.length - 1; i++) {
    const routePair = routeArr[i] + routeArr[i + 1];
    let matchedPair = graphArr.filter((pair) => pair.includes(routePair));
    if (!matchedPair.length) {
      return "No Such Route";
    }
    const routeCost = parseInt(matchedPair.toString().substring(2));
    totalCost += routeCost;
  }

  return totalCost;
};

export default calcDeliveryCost;
