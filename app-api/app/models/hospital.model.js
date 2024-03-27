module.exports = (sequelize, Sequelize) => {
  const Hospital = sequelize.define("hospital", {
    index_col: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Facility_ID: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Facility_Name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    City: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    State: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ZIP_Code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    County_Name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Phone_Number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    HCAHPS_Measure_ID: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    HCAHPS_Question: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    HCAHPS_Answer_Description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Patient_Survey_Star_Rating: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Patient_Survey_Star_Rating_Footnote: {
      type: Sequelize.STRING,
    },
    HCAHPS_Answer_Percent: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    HCAHPS_Answer_Percent_Footnote: {
      type: Sequelize.STRING,
    },
    HCAHPS_Linear_Mean_Value: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Number_of_Completed_Surveys: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Number_of_Completed_Surveys_Footnote: {
      type: Sequelize.STRING,
    },
    Survey_Response_Rate_Percent: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Survey_Response_Rate_Percent_Footnote: {
      type: Sequelize.STRING,
    },
    Start_Date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    End_Date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    Year: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Hospital_Type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Hospital_Ownership: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Emergency_Services: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Meets_criteria_for_promoting_interoperability_of_EHRs: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Hospital_overall_rating: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Hospital_overall_rating_footnote: {
      type: Sequelize.STRING,
    },
    Mortality_national_comparison: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Mortality_national_comparison_footnote: {
      type: Sequelize.STRING,
    },
    Safety_of_care_national_comparison: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Safety_of_care_national_comparison_footnote: {
      type: Sequelize.STRING,
    },
    Readmission_national_comparison: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Readmission_national_comparison_footnote: {
      type: Sequelize.STRING,
    },
    Patient_experience_national_comparison: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Patient_experience_national_comparison_footnote: {
      type: Sequelize.STRING,
    },
    Effectiveness_of_care_national_comparison: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Effectiveness_of_care_national_comparison_footnote: {
      type: Sequelize.STRING,
    },
    Timeliness_of_care_national_comparison: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Timeliness_of_care_national_comparison_footnote: {
      type: Sequelize.STRING,
    },
    Efficient_use_of_medical_imaging_national_comparison: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Efficient_use_of_medical_imaging_national_comparison_footnote: {
      type: Sequelize.STRING,
    },
    lat: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    lon: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  }, {
    timestamps: false
  });

  return Hospital;
};
