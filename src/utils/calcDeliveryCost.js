const calcDeliveryCost = (graph, route) => {
  //convert user's graph and routes from string to array
  const graphArr = graph.split(", ");
  const routeArr = route.split("-");
  //initialize total cost variable
  let totalCost = 0;

  //loop through the routes and check for the cost of those routes in our graph array
  //increment our total cost if we find one, else stop loop and return "No Such Route"
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
