interface WithdrawalResult {
  bills: { denomination: number; count: number }[];
  success: boolean;
  errorMessage?: string;
}

class ATM {
  private balance: number;
  private readonly denominations = [100, 50, 20, 10, 5];
  private readonly maxWithdrawal = 1000;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  withdraw(requestedAmount: number): WithdrawalResult {
    if (this.isInvalidAmount(requestedAmount)) {
      return this.createErrorResult("Invalid amount requested");
    }

    if (this.isAmountTooLarge(requestedAmount)) {
      return this.createErrorResult("Amount exceeds maximum withdrawal limit");
    }

    if (this.hasInsufficientFunds(requestedAmount)) {
      return this.createErrorResult("Insufficient funds");
    }

    if (this.cannotDispenseExactAmount(requestedAmount)) {
      return this.createErrorResult("Cannot dispense exact amount");
    }

    const bills = this.calculateBills(requestedAmount);
    this.balance -= requestedAmount;

    return this.createSuccessResult(bills);
  }

  private isInvalidAmount(amount: number): boolean {
    return amount <= 0;
  }

  private isAmountTooLarge(amount: number): boolean {
    return amount > this.maxWithdrawal;
  }

  private hasInsufficientFunds(amount: number): boolean {
    return amount > this.balance;
  }

  private cannotDispenseExactAmount(amount: number): boolean {
    const smallestDenomination = this.denominations[this.denominations.length - 1];
    const remainder = amount % smallestDenomination;
    return remainder !== 0;
  }

  private calculateBills(amount: number): { denomination: number; count: number }[] {
    const bills: { denomination: number; count: number }[] = [];
    let remainingAmount = amount;

    for (const denomination of this.denominations) {
      const billsNeeded = this.calculateBillsForDenomination(remainingAmount, denomination);
      if (billsNeeded === 0) {
        continue;
      }
      bills.push({ denomination, count: billsNeeded });
      remainingAmount -= billsNeeded * denomination;
    }

    return bills;
  }

  private calculateBillsForDenomination(amount: number, denomination: number): number {
    return Math.floor(amount / denomination);
  }

  private createErrorResult(errorMessage: string): WithdrawalResult {
    return {
      bills: [],
      success: false,
      errorMessage,
    };
  }

  private createSuccessResult(bills: { denomination: number; count: number }[]): WithdrawalResult {
    return {
      bills,
      success: true,
    };
  }

  getBalance(): number {
    return this.balance;
  }
}

export { ATM };
