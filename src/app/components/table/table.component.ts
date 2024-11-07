import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {NgForOf} from '@angular/common';
import {VitalSign} from '../../resources/patient-vitals.model';
import {User} from '../../core/User';
import {VitalsGeneratorService} from '../../core/vitals-generator.service';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MaterialModule} from '../../resources/material.module';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MaterialModule, NgForOf, MatFormField, MatInput, MatTooltip],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit{
  @ViewChild(MatSort) sort!: MatSort;
  @Input() usersInScope: User[] = [];
  displayedColumns = [
    'patientName',
    'heartRate',
    'bloodPressure',
    'spo2',
    'temperature',
    'timestamp'
  ]
  dataSource = new MatTableDataSource<VitalSign>([]);

  constructor(private vgs: VitalsGeneratorService) {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.vgs.getVitalSigns(this.usersInScope).subscribe(data =>{
      this.dataSource.data = this.usersInScope.map((user) => {
        const userVitals = data.filter(vital => vital.patientUID === user.UID);
        return userVitals[userVitals.length - 1] || []
      })
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
