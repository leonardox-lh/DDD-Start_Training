import { Result } from 'typescript-result';
import { AppNotification } from '../../application/app.notification';

export class Name {
  private readonly Name: string;
  private readonly lastName: string;
  private static MAX_LENGTH: number = 75;

  private constructor(name: string, lastName: string) {
    this.Name = name;
    this.lastName = lastName;
  }

  public getFirstName(): string {
    return this.Name;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public static create(name: string, lastName: string): Name {
    name = (name ?? "").trim();
    lastName = (lastName ?? "").trim();
    return new Name(name, lastName);
  }

  public static createv2(firstName: string, lastName: string): Result<AppNotification, Name> {
    let notification: AppNotification = new AppNotification();
    firstName = (firstName ?? "").trim();
    lastName = (lastName ?? "").trim();
    if (firstName === "") {
      notification.addError('firstName is required', null);
    }
    if (lastName === "") {
      notification.addError('lastName is required', null);
    }
    if (firstName.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of an firstName is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if (lastName.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of an lastName is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Name(firstName, lastName));
  }
}