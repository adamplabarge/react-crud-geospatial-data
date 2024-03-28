import React from "react";
import "./Controls.css";

const Controls = ({
  options,
  onChange,
  selected,
  isGeoLocationBased,
  isFetching,
  isFetchError,
}) => {
  
  const handleReload = () => window.location.reload()

  const handleOnChange = (e) => onChange(e.target.value)

  return (
    <div className="controls">
      <div class="form-group">
        { isFetchError && <>
          <div class="alert alert-danger" role="alert">
           Error: Unable to load data.  Please try <span onClick={handleReload}>reloading.</span>
          </div>
        </>}
        {isGeoLocationBased && !isFetchError ? (
          <div class="alert alert-primary" role="alert">
            <div className="alert__geolocation">
              <div>
                <p>Results are based on geolocation. </p>
              </div>
              <div>
                <button type="button" class="btn btn-primary">
                  Select by State
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {isFetching ? (
              <div className="container__spinner">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <label for="exampleFormControlSelect1">Select a State</label>
                <select
                  class="form-control"
                  onChange={handleOnChange}
                  defaultValue={selected}
                  name="state-select"
                >
                  <option value="" disabled selected>
                    Select your state
                  </option>
                  {options.map((option) => (
                    <option value={option}>{option}</option>
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
