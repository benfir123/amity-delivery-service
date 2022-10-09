import { useState } from "react";
import "./App.css";
import calcDeliveryCost from "./utils/calcDeliveryCost";
import calcPossibleRoutes from "./utils/calcPossibleRoutes";

const App = () => {

  const [graph, setGraph] = useState("")
  const [graphError, setGraphError] = useState("")
  const [isGraphValid, setIsGraphValid] = useState(false)
  const [route, setRoute] = useState("")
  const [routeError, setRouteError] = useState("")
  const [deliveryCost, setDeliveryCost] = useState("")
  const [startTown, setStartTown] = useState("")
  const [startTownError, setStartTownError] = useState("")
  const [endTown, setEndTown] = useState("")
  const [endTownError, setEndTownError] = useState("")
  const [maxStops, setMaxStops] = useState("")
  const [maxStopsError, setMaxStopsError] = useState("")
  const [possibleRoutes, setPossibleRoutes] = useState("")

  const validateGraph = () => {
    const regex = RegExp(
      "^[A-Z]{2}[0-9]+$"
    )
    let graphError = "";

    if (!graph) {
      graphError = "graph cannot be blank"
    } else if (graph.length < 3) {
      graphError = "must provide at least 1 valid route"
    } else if (new Set(graph.split(", ")).size !== graph.split(", ").length) {
      graphError = "no duplicate routes"
    } else if (graph.split(", ").filter(route => regex.test(route) !== true).length) {
      graphError = "Oops, looks like the wrong format"
    }

    if (graphError) {
      setGraphError(graphError)
      return false
    }
    return true;

  };

  const handleGraphSubmit = event => {
    event.preventDefault();
    const isValid = validateGraph();
    if (isValid) {
      setGraphError("")
      setIsGraphValid(true)
    }
  };

  const validateRoute = () => {
    const regex = RegExp(
      "^[A-Z]{1}$"
    )
    let routeError = "";

    if (!route) {
      routeError = "route cannot be blank"
    } else if (route.length < 3) {
      routeError = "must provide at least 1 valid route"
    } else if (route.split("-").filter(route => regex.test(route) !== true).length) {
      routeError = "Oops, looks like the wrong format"
    }

    if (routeError) {
      setRouteError(routeError)
      return false
    }
    return true;

  };

  const handleRouteSubmit = event => {
    event.preventDefault();
    const isValid = validateRoute();
    if (isValid) {
      setRouteError("")
      setDeliveryCost(calcDeliveryCost(graph, route))
    }
    
  };

  const validateConstraints = () => {
    const routeRegex = RegExp(
      "^[A-Z]{1}$"
    )
    const maxStopsRegex = RegExp(
      "^[0-9]+$"
    )
    let startTownError = "";
    let endTownError = "";
    let maxStopsError = "";

    if (!startTown) {
      startTownError = "route cannot be blank"
    } else if (!routeRegex.test(startTown)) {
      startTownError = "Oops, looks like the wrong format"
    }

    if (!endTown) {
      endTownError = "route cannot be blank"
    } else if (!routeRegex.test(endTown)) {
      endTownError = "Oops, looks like the wrong format"
    }

    if (maxStops && (!maxStopsRegex.test(maxStops) || maxStops === "0")) {
      maxStopsError = "Oops, looks like the wrong format"
    }


    if (startTownError || endTownError || maxStopsError) {
      setStartTownError(startTownError)
      setEndTownError(endTownError)
      setMaxStopsError(maxStopsError)
      return false
    }
    return true;

  };

  const handleConstraintSubmit = event => {

    event.preventDefault();
    const isValid = validateConstraints();
    if (isValid) {
      setStartTownError("")
      setEndTownError("")
      setMaxStopsError("")
     maxStops ? setPossibleRoutes([...calcPossibleRoutes(graph, startTown, endTown, parseInt(maxStops))].length)
     : setPossibleRoutes([...calcPossibleRoutes(graph, startTown, endTown)].length)
      

    }
    
  };

  return <div className="App">

    <div className="container">
      <div>
        <form onSubmit={handleGraphSubmit}>
          <h2>Step 1</h2>
          <span>Enter a weighted directed graph with the following format.</span>
          <small>
            <p>Example: AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1</p>
          </small>
          <label htmlFor="graphInput">Graph </label>
          <input type="text" name="graph_input" id="graphInput" onChange={(e) => setGraph(e.target.value)}
                value={graph} disabled={isGraphValid ? true : false} />
            <div style={{ fontSize: 12, color: "red" }}>
            {graphError}
            
            
          </div>
          {isGraphValid && <div style={{ fontSize: 12, color: "green" }}>
            that looks good
          </div>}
                <button type="submit">Submit</button>
          
        </form>
        </div>


        <form onSubmit={handleRouteSubmit}>
          <div>
          <h2>Step 2</h2>
          <span>Enter route to see delivery cost</span>
          <small>
            <p>Example: A-B-E</p>
          </small>
          <label htmlFor="route">Route</label>
          <input type="text" name="route" id="route" onChange={(e) => setRoute(e.target.value)}
                value={route} disabled={isGraphValid ? false : true} />

          <div style={{ fontSize: 12, color: "red" }}>
              {routeError}
          
          
            </div>
            {(deliveryCost && !routeError) &&<div style={{ fontSize: 12, color: "green" }}>
              The delivery cost of that route is: {deliveryCost}
            </div>}
          <button type="submit">Submit</button>
          </div>
        </form>


        <form onSubmit={handleConstraintSubmit}>
          <div>
          <h2>Step 3</h2>
          <span>Enter conditions to see all possible routes.</span>
          <label htmlFor="startTown">Start Town</label>
          <input type="text" name="start_town" id="startTown" onChange={(e) => setStartTown(e.target.value)}
                value={startTown} disabled={isGraphValid ? false : true}  />
                <div style={{ fontSize: 12, color: "red" }}>
            {startTownError}
            
            
          </div>
          <label htmlFor="endTown">End Town</label>
          <input type="text" name="end_town" id="endTown" onChange={(e) => setEndTown(e.target.value)}
                value={endTown} disabled={isGraphValid ? false : true} />
                <div style={{ fontSize: 12, color: "red" }}>
            {endTownError}
            
            
          </div>
          <label htmlFor="maxStops">Maximum Stops</label>
          <input type="text" name="max_stops" id="maxStops" onChange={(e) => setMaxStops(e.target.value)}
                value={maxStops} disabled={isGraphValid ? false : true} />
                <div style={{ fontSize: 12, color: "red" }}>
            {maxStopsError}
            
            
          </div>
          <button type="submit">Submit</button>
          {(possibleRoutes && !startTownError && !endTownError && !maxStopsError) &&<div style={{ fontSize: 12, color: "green" }}>
              The number of possible routes is: {possibleRoutes}
            </div>}
          </div>
        </form>
      </div>
      

  </div>;
}

export default App;
