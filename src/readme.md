# Chegg Skills Capstone #4 Readme
# Problem
Hospitals struggle to continuously monitor patients' vital signs and promptly identify those at risk of adverse events. Current systems often miss complex patterns or generate false alarms, leading to delayed interventions, increased risk, and higher expenses.
# Solution
A mobile and desktop application that notifies staff of patients needing assistance. In an official capacity, this could vary by installation to include technologies such as pagers, intercom systems and audible alarms.  

Behind the interface, a mix of research and clinical data is joined with historical patient context, creating a foundation where real-time data can be evaluated for anomalies.


# Technical Components
## Data Sources
- Publicly available: `MIMIC-III`, `MIMIC-IV`, `eICU`, `PhysioNet`
- Synthetic, as needed for training and demonstration

## Model Selection
- Time Series Analysis
  - `ARIMA`
  - Establish running baseline, forcasting, prediction of future values
- Supervised Learning
  - `Neural Networks`, `Random Forest`, `Gradient Boosting`
  - Expand prediction, inject external factors (demographics, med. history...)
- Unsupervised Learning
  - `UMAP`, `KMeans`, `DBSCAN`
  - Identify unexpected deviations, patterns and anomalies

## Architecture
- Jupyter Notebooks, Python: Research and data analysis, model training
- Angular, TypeScript: Client-side implementation, demonstration
