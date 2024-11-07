import { Injectable } from '@angular/core';
import {BehaviorSubject, interval, Observable} from 'rxjs';
import {User} from './User';
import {VitalSign} from '../resources/patient-vitals.model';

@Injectable({
  providedIn: 'root'
})
export class VitalsGeneratorService {

  private vitalSignsData = new Map<string, VitalSign[]>();
  private vitalSignsSubject = new BehaviorSubject<VitalSign[]>([]);
  private users: User[] = [];


  getVitalSigns(users: User[], refreshInterval = 1000): Observable<VitalSign[]> {
    this.users = users;
    // Initialize vital signs data for each user
    users.forEach((user) => {
      if (!this.vitalSignsData.has(user.UID)) {
        this.vitalSignsData.set(user.UID, []);
      }
    });

    interval(refreshInterval).subscribe(() => {
      this.generateAndStoreVitalSigns();
      const allVitalSigns = Array.from(this.vitalSignsData.values()).flat();
      this.vitalSignsSubject.next(allVitalSigns);
    });

    return this.vitalSignsSubject.asObservable();
  }


  private generateAndStoreVitalSigns() {
    this.users.forEach((user) => {
      const newVitalSign: VitalSign = {
        patientUID: user.UID,
        patientName: `${user.firstName} ${user.lastName}`,
        heartRate: this.randomNumber(60, 100),
        bloodPressure: `${this.randomNumber(110, 130)}/${this.randomNumber(70, 90)}`,
        spo2: this.randomNumber(60, 100),
        temperature: this.randomFloat(36.5, 37.5),
        timestamp: new Date(),
      };

      const userVitalSigns = this.vitalSignsData.get(user.UID);
      if (userVitalSigns) {
        userVitalSigns.push(newVitalSign);
        if (userVitalSigns.length > 120) {
          userVitalSigns.shift(); // Remove the oldest vital sign
        }
      }
    });
  }

  private randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private randomFloat(min: number, max: number): number {
    return parseFloat((Math.random() * (max - min) + min).toFixed(1));
  }
}
