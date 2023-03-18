var map;
var directionsManager;
var sampleStyle = {
  elements: {
    park: { fillColor: "#a9de83" },
    controlledAccessHighway: {
      fillColor: "#9fb6bd",
      strokeColor: "#D3B300",
      labelColor: "#444444",
      labelOutlineColor: "#60ffffff",
    },
    highway: {
      fillColor: "#c1d1d6",
      strokeColor: "#a6b5bb",
      labelColor: "#444444",
      labelOutlineColor: "#60ffffff",
    },
    water: { fillColor: "#a6cbe3" },
    medicalBuilding: { fillColor: "#fceced" },
    majorRoad: { fillColor: "#a6b5bb" },
    education: { fillColor: "#f0e8f8" },
    arterialRoad: { fillColor: "#ffffff" },
    structure: { fillColor: "#faf8ed" },
    buildinglobal: { fillColor: "#dde2e3" },
    forest: { fillColor: "#deebdd" },
    vegetation: { fillColor: "#deebdd" },
    reserve: { fillColor: "#deebdd" },
    street: { fillColor: "#ffffff", strokeColor: "#e6e3df" },
    roadShield: { fillColor: "#ffffff" },
    medical: { fillColor: "#ffddee" },
    educationBuildinglobal: { fillColor: "#f6f0f1" },
    golfCourse: { fillColor: "#c5dabb" },
  },
  settings: { landColor: "#dde2e3" },
  version: "1.0",
  extensions: {},
};

function GetMap() {
  map = new Microsoft.Maps.Map("#myMap", {
    showDashboard: false,
    customMapStyle: sampleStyle,
  });

  //Load the directions module.
  Microsoft.Maps.loadModule("Microsoft.Maps.Directions", function () {
    //Create an instance of the directions manager.
    directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);

    //Specify where to display the route instructions.
    directionsManager.setRenderOptions({
      itineraryContainer: "#directionsItinerary",
    });

    //Specify the where to display the input panel
    directionsManager.showInputPanel("directionsPanel");
    Microsoft.Maps.Events.addHandler(
      directionsManager,
      "directionsUpdated",
      directionsUpdated
    );
  });
}
function directionsUpdated(e) {
  //Get the current route index.
  var routeIdx = directionsManager.getRequestOptions().routeIndex;
  var routeMode = directionsManager.getRequestOptions().routeMode;

  //Get the distance of the route, rounded to 2 decimal places.
  var distance = Math.round(e.routeSummary[routeIdx].distance * 100) / 100;

  //Get the distance units used to calculate the route.
  var units = directionsManager.getRequestOptions().distanceUnit;
  var distanceUnits = "";

  if (units == Microsoft.Maps.Directions.DistanceUnit.km) {
    distanceUnits = "km";
  } else {
    //Must be in miles
    distanceUnits = "miles";
  }
  carbonCalculate(routeMode, distance);
  //Time is in seconds, convert to minutes and round off.
  var time = Math.round(e.routeSummary[routeIdx].timeWithTraffic / 60);
}
function carbonCalculate(e, d) {
  console.log("Mode", e);
  console.log("Distance", d);
  var multi;
  switch (e) {
    case 1:
      multi = 121 * d;
      break;
    case 2:
      multi = 7.837 * d;
      break;
    case 3:
      multi = 0 * d;
      break;
  }
  console.log("Multi", multi);
  return multi;
}
