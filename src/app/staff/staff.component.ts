import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FeatureHeadingComponent} from '../components/feature-heading/feature-heading.component';
import {MaterialModule} from '../resources/material.module';
import {HighchartsComponent} from '../components/highcharts/highcharts.component';
import {TableComponent} from '../components/table/table.component';
import {UserService} from '../core/user.service';
import {Observable} from 'rxjs';
import {VitalSign} from '../resources/patient-vitals.model';
import {MatTab, MatTabContent, MatTabGroup} from '@angular/material/tabs';

const generateBloodPressureData = () => [
  { name: 'Patient 1 - Systolic', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (140 - 90) + 90)) },
  { name: 'Patient 1 - Diastolic', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (90 - 60) + 60)) },

  { name: 'Patient 2 - Systolic', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (140 - 90) + 90)) },
  { name: 'Patient 2 - Diastolic', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (90 - 60) + 60)) },

  { name: 'Patient 3 - Systolic', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (140 - 90) + 90)) },
  { name: 'Patient 3 - Diastolic', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (90 - 60) + 60)) },

  { name: 'Patient 4 - Systolic', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (140 - 90) + 90)) },
  { name: 'Patient 4 - Diastolic', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (90 - 60) + 60)) },

  { name: 'Patient 5 - Systolic', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (140 - 90) + 90)) },
  { name: 'Patient 5 - Diastolic', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (90 - 60) + 60)) },
];
const generateSpo2Data = () => [
  { name: 'Patient 1 - SpO2', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (100 - 92) + 92)) },
  { name: 'Patient 2 - SpO2', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (100 - 92) + 92)) },
  { name: 'Patient 3 - SpO2', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (100 - 92) + 92)) },
  { name: 'Patient 4 - SpO2', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (100 - 92) + 92)) },
  { name: 'Patient 5 - SpO2', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (100 - 92) + 92)) },
];
const generateHeartRateData = () => [
  { name: 'Patient 1 - Heart Rate', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (120 - 60) + 60)) },
  { name: 'Patient 2 - Heart Rate', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (120 - 60) + 60)) },
  { name: 'Patient 3 - Heart Rate', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (120 - 60) + 60)) },
  { name: 'Patient 4 - Heart Rate', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (120 - 60) + 60)) },
  { name: 'Patient 5 - Heart Rate', data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (120 - 60) + 60)) },
];

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [
    FeatureHeadingComponent, MaterialModule, HighchartsComponent, TableComponent, MatTabGroup, MatTab, MatTabContent
  ],
  templateUrl: './staff.component.html',
  styles: ''
})
export class StaffComponent implements OnInit{

  bloodPressureData = generateBloodPressureData();
  heartRateData = generateHeartRateData();
  spo2Data = generateSpo2Data();
  timeCategories = ['30s', '25s', '20s', '15s', '10s', '5s', 'latest'];

  vitalStream$!: Observable<VitalSign[]>;

  constructor(
    private cdr: ChangeDetectorRef,
    private us: UserService,) { }

  ngOnInit() {
    // this.vitalStream$ = this.vgs.getVitalSigns(this.us.patients)
    // this.vgs.getVitalSigns(this.us.patients).subscribe(r =>{
    //   console.log(r);
    // })
    setInterval(() => {
      this.bloodPressureData = this.generateSeriesData(this.bloodPressureData)
      this.heartRateData = this.generateSeriesData(this.heartRateData);
      this.spo2Data = this.generateSeriesData(this.spo2Data);
      this.cdr.detectChanges(); // Ensure Angular detects the data changes
    }, 5000); // Update every 5 seconds
  }
  get patients(){
    return this.us.patients
  }

  get bpLabels(){
    return {
      title: 'Blood Pressure Over Time',
      xAxis: 'Metric Reading Age (seconds)',
      yAxis: 'Blood Pressure (mmHg)'
    }
  }
  get hrLabels(){
    return {
      title: 'Heart Rate Over Time',
      xAxis: 'Metric Reading Age (seconds)',
      yAxis: 'Beats Per Second (BPS)'
    }
  }
  get spo2Labels(){
    return {
      title: 'Oxygen Saturation Over Time',
      xAxis: 'Metric Reading Age (seconds)',
      yAxis: 'Saturation Level (SpO2)'
    }
  }
  private generateSeriesData(currentData:  { name: string, data: number[] }[]){
    return currentData.map(series => {
      const newData = [...series.data];
      newData.push(Math.floor(Math.random() * (140 - 60) + 60)); // Add new random data
      newData.shift(); // Maintain a fixed-length series by removing the oldest data point
      return { ...series, data: newData };
    });
  }
}
