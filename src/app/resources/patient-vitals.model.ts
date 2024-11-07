export interface VitalSign {
  patientUID: string;
  patientName: string;
  heartRate: number;
  bloodPressure: string;
  spo2: number;
  temperature: number;
  timestamp: Date;
}
