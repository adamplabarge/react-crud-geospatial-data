import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import HospitalsDataService from "./services/hospital.service";

const App = () => {

  useEffect(()=> {
    HospitalsDataService.findByState('AL')
      .then(console.log)
  }, [])

  return (
    <div>

    </div>
  );
};

export default App;
