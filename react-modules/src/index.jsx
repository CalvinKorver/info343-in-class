// Where the application actually starts 

import React from "react";
import {render} from "react-dom";

// If it sees ./ then it assumes that it is a local elementfs 
import App from "./app.jsx";

render(<App/>, document.getElementById("app"));

