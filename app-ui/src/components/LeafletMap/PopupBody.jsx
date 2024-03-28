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
  return <div class="alert alert-primary" role="alert">
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