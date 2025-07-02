// * Enforce invariant rules that ensure data quality

// * Value Objects (VO) are immutable objects that represent a value in the domain model.

// No Id

// ! no business logic

export class Money {
  readonly amount: number;
  readonly currency: string;

  constructor(amount: number, currency: string) {
    if (amount < 0) {
      throw new Error("Amount cannot be negative");
    }
    if (amount > 1000000) {
      throw new Error("Amount cannot exceed 1,000,000");
    }
    if (!currency || currency.length !== 3) {
      throw new Error("Currency must be a 3-letter code");
    }
    this.amount = amount;
    this.currency = currency;
  }

  toString() {
    return `${this.amount.toFixed(2)} ${this.currency}`;
  }
}

export class ClientVO {
  // * immutable data
  public readonly name: string;
  public readonly country: string;
  public readonly city: string;

  // * Representation of data
  public toString() {
    return `${this.name} - ${this.city}, ${this.country}`;
  }
}

export class PaymentVO {
  public readonly isDeferred: boolean;
  public readonly amount: Money;
  public readonly deferredMonths: number;
  public readonly isRecurred: boolean;

  // * Validation and constraints
  constructor(isDeferred: boolean, amount: Money, deferredMonths: number, isRecurred: boolean) {
    if (isDeferred && deferredMonths <= 0) {
      throw new Error("Deferred months must be greater than 0");
    }
    if (isDeferred && isRecurred) {
      throw new Error("Recurred payment cannot be deferred");
    }
    this.isDeferred = isDeferred;
    this.amount = amount;
    this.deferredMonths = deferredMonths;
    this.isRecurred = isRecurred;
  }
}

export class CardNumber {
  // * immutable data
  public readonly number: string;
  constructor(number: string) {
    if (number.length !== 16) {
      throw new Error("Card number must have 16 digits");
    }
    if (!/^\d+$/.test(number)) {
      throw new Error("Card number must have only digits");
    }
    this.number = number;
  }
  // * Representation of data
  public getMaskedNumber() {
    return `**** **** **** ${this.number.slice(-4)}`;
  }
}

export class CardVO {
  // * immutable data
  public readonly number: CardNumber;
  public readonly validUntil: string;
  public readonly verificationCode: number;

  // * Validation and constraints
  constructor(number: CardNumber, validUntil: string, verificationCode: number) {
    if (!/^\d{2}\/\d{2}$/.test(validUntil)) {
      throw new Error("Card valid until must be MM/YY");
    }
    if (verificationCode < 0) {
      throw new Error("Verification code must be positive");
    }
    this.number = number;
    this.validUntil = validUntil;
    this.verificationCode = verificationCode;
  }

  // * Representation of data
  public getMaskedNumber() {
    return this.number.getMaskedNumber();
  }

  // * Domain knowledge with its own data
  public getExpirationDate(): Date {
    const [cardMonth, cardYear] = this.validUntil.split("/");
    const year = Number.parseInt(cardYear, 10) + 2000;
    const month = Number.parseInt(cardMonth, 10) - 1;
    const nextMonth = month + 1;
    return new Date(year, nextMonth, 1);
  }
}
