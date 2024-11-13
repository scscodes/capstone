# Capstone

# Running Locally
`npm install`  
`npm run start`

# MIMIC Datasets
- Hospital and ICU data is from Version 3.1
- Varying prerequisites and access methods by dataset
- Steps outlined on official pages, ref:
  - Official Website: [PhysioNet MIMIC IV version 3.1](https://physionet.org/content/mimiciv/3.1/)
  - `mimic-code` [GitHub Repository](https://github.com/MIT-LCP/mimic-code)
- For local builds, nice-to-have: `PostgreSQL 16, gzip`

## Depersonalization; Anchor values, Time Shifts


The `anchor_year` column is a deidentified year occurring sometime between 2100 - 2200.  
The `anchor_year_group` column is one of the following values: "2008 - 2010", "2011 - 2013", "2014 - 2016", "2017 - 2019", and "2020 - 2022".  
> Example: if a patient's `anchor_year` is 2158, and their `anchor_year_group` is 2011 - 2013, then any hospitalizations for the patient occurring in the year 2158 actually occurred sometime between 2011 - 2013.


The `anchor_age` provides the patient age in the given `anchor_year`.
> Example: If the patient was over 89 in the `anchor_year`, this `anchor_age` has been set to 91 (i.e. all patients over 89 have been grouped together into a single group with value 91, regardless of what their real age was).

