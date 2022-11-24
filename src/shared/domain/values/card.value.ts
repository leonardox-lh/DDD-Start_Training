import { AppNotification } from "src/shared/application/app.notification";
import { Result } from "typescript-result";

export class Card {
  private readonly value: string;
  private static MAX_LENGTH: number = 12;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(value: string): Card
  {
    value = (value ?? "").trim();
    return new Card(value);
  }

  public static createResult(value: string): Result<AppNotification, Card>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('dni is required', null);
    }
    if (value.length != this.MAX_LENGTH) {
      notification.addError('dni field must have ' + Card.MAX_LENGTH + ' characters', null);
    }
    const regExp = new RegExp('^[0-9]+$');
    if (regExp.test(value) === false) {
      notification.addError('dni format is invalid', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Card(value));
  }
}