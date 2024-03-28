/**
 * Renders the body of the popup component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.Facility_Name - The name of the facility.
 * @param {string} props.Address - The address of the facility.
 * @param {string} props.City - The city of the facility.
 * @param {string} props.ZIP_Code - The ZIP code of the facility.
 * @param {number} props.Patient_Survey_Star_Rating - The star rating of the facility based on patient surveys.
 * @param {string} props.Phone_Number - The phone number of the facility.
 * @returns {JSX.Element} - The rendered component.
 */
import React from 'react'
import './PopupBody.css'

const PopupBody = ({
  Facility_Name,
  Address,
  City,
  ZIP_Code,
  Patient_Survey_Star_Rating,
  Phone_Number
}) => {
  return <div className="alert alert-primary" role="alert">
    <ul className="popupbody__list">
      <li>{Facility_Name}</li>
      <li><small>{Address}</small></li>
      <li><small>{`${City} ${ZIP_Code}`}</small></li>
      <li><small>{Phone_Number}</small></li>
    </ul>
    <hr />
    <ul className="popupbody__list">
      <li>Rating: {Patient_Survey_Star_Rating}</li>
    </ul>
  </div>
}

export default PopupBody