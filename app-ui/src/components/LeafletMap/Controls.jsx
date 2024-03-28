import React from "react";
import "./Controls.css";

const Controls = ({
  options,
  onChange,
  selected,
  isGeoLocationBased,
  isFetching,
  isFetchError,
  onChangeToManualSelect
}) => {
  
  const handleReload = () => window.location.reload()

  const handleOnChange = (e) => onChange(e.target.value)

  return (
    <div className="controls">
      <div className="form-group">
        { isFetchError && <>
          <div className="alert alert-danger" role="alert">
           Error: Unable to load data.  Please try <span onClick={handleReload}>reloading.</span>
          </div>
        </>}
        {isGeoLocationBased && !isFetchError ? (
          <div className="alert alert-primary" role="alert">
            <div className="alert__geolocation">
              <div>
                <p>Results are based on geolocation. </p>
              </div>
              <div>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={onChangeToManualSelect}
                >
                  Select by State
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {isFetching ? (
              <div className="container__spinner">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <label htmlFor="exampleFormControlSelect1">Select a State</label>
                <select
                  className="form-control"
                  onChange={handleOnChange}
                  defaultValue={selected}
                  name="state-select"
                >
                  <option value="" disabled>
                    Select your state
                  </option>
                  {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Controls;
