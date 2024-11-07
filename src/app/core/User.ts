import {v5 as uuidv5} from 'uuid';
const UUID_NAMESPACE = '011180f3-080d-4873-9660-280ab5c255ee';
export type UserRole = 'patient' | 'staff' | 'admin' | null;
export interface UserProperties {
  firstName: string;
  lastName: string;
  email: string;
  userName?: string;
  role: UserRole;
}

export class User {
  firstName: string;
  lastName: string;
  UID: string;
  email: string;
  userName: string;
  role: UserRole;

  private static existingUIDs: Set<string> = new Set();
  private static existingEmails: Set<string> = new Set();
  private static patientCount: number = 0;
  private static staffCount: number = 0;
  private static adminCount: number = 0;
  private static otherCount: number = 0;

  constructor(userProperties: UserProperties) {
    this.firstName = userProperties.firstName;
    this.lastName = userProperties.lastName;
    this.email = userProperties.email;
    this.UID = uuidv5(this.email, UUID_NAMESPACE); // Generating new UID
    this.role = userProperties.role;
    this.userName = userProperties.userName || userProperties.email;

    if (!this.validateUniqueEmail(this.email)) {
      throw new Error(`Email already in use: ${this.email}`);
    }

    if(!this.validateUniqueUID(this.UID)){
      throw new Error(`UID already in use: ${this.UID}`);
    }

    // Add UID and email to the existing sets
    User.existingUIDs.add(this.UID);
    User.existingEmails.add(this.email);
    switch (this.role) {
      case 'patient': User.patientCount++;return;
      case 'staff': User.staffCount++;return;
      case 'admin': User.adminCount++;return;
      default: User.otherCount++;return;
    }
  }

  private validateUniqueUID(UID: string): boolean {
    return !User.existingUIDs.has(UID);
  }

  private validateUniqueEmail(email: string): boolean {
    return !User.existingEmails.has(email);
  }

  // static authenticate(email: string, UID: string): boolean {
  //   return User.existingUIDs.has(UID) && User.existingEmails.has(email);
  // }

  static getRoleCounters(){
    return {
      patients: User.patientCount,
      staff: User.staffCount,
      admin: User.adminCount,
      other: User.otherCount
    }
  }

}
