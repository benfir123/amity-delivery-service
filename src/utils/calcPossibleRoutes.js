function* calcPossibleRoutes(
  graph,
  startTown,
  endTown,
  maxStops = Infinity,
  path = []
) {
  const connections = convertGraphToMap(graph);
  //generator function (DFS)
  //conclude a path when the end town has been reached (except for the special case when the end and start town are the same)
  if (startTown === endTown && path.length) {
    yield path.concat(endTown);
  } else if (connections.get(startTown).length) {
    path.push(startTown);
    for (const neighbor of connections.get(startTown)) {
      //hault recursion due to either hitting number of max stops or traveling the same route
      if (path.length < maxStops + 1 && !hasDuplicateRoute(path)) {
        yield* calcPossibleRoutes(graph, neighbor, endTown, maxStops, path);
      }
    }
    path.pop(startTown);
  }
}

//check the current path for duplicate routes
const hasDuplicateRoute = (path) => {
  for (let i = 0; i < path.length - 1; i++) {
    for (let j = i; j < path.length - 1; j++) {
      const baseRoute = path[i] + path[i + 1];
      const targetRoute = path[j + 1] + path[j + 2];
      if (baseRoute === targetRoute) {
        return true;
      }
    }
  }
};

//convert user's graph from string to JavaScript Map in order to have parent/children relationship between nodes
const convertGraphToMap = (graph) => {
  const graphWithNoCost = graph.replace(/[0-9 ,]/g, "");
  const allTownsFromRoutes = graphWithNoCost.split("");
  const uniqueTowns = [...new Set(allTownsFromRoutes)];

  const allRoutes = graph.replace(/[0-9]/g, "");
  const routesArr = allRoutes.split(", ");
  const routesArrPairs = routesArr.map((pair) => pair.split(""));

  const connections = new Map();

  uniqueTowns.forEach((town) => connections.set(town, []));
  routesArrPairs.forEach((route) => {
    connections.get([...route][0]).push([...route][1]);
  });

  return connections;
};

export default calcPossibleRoutes;
