import React from "react";
import "./Controls.css";

/**
 * Controls component for selecting and displaying data options.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.options - The array of options to be displayed in the select dropdown.
 * @param {Function} props.onChange - The function to be called when the select value changes.
 * @param {string} props.selected - The currently selected value in the select dropdown.
 * @param {boolean} props.isGeoLocationBased - A flag indicating whether the data is based on geolocation.
 * @param {boolean} props.isFetching - A flag indicating whether data is being fetched.
 * @param {boolean} props.isFetchError - A flag indicating whether there was an error fetching the data.
 * @param {Function} props.onChangeToManualSelect - The function to be called when switching to manual select mode.
 * @returns {JSX.Element} The rendered Controls component.
 */
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
