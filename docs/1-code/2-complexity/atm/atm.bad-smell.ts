// Deliberately dirty implementation with complex expressions and deep nesting
class DirtyATM {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  // One massive function with complex expressions, deep nesting, and poor readability
  withdraw(amount: number): {
    bills: { denomination: number; count: number }[];
    success: boolean;
    errorMessage?: string;
  } {
    return amount <= 0 || amount > 1000 || amount > this.balance || amount % 5 !== 0
      ? {
          bills: [],
          success: false,
          errorMessage:
            amount <= 0
              ? "Invalid amount"
              : amount > 1000
                ? "Exceeds limit"
                : amount > this.balance
                  ? "Insufficient funds"
                  : "Cannot dispense exact amount",
        }
      : (() => {
          const bills: { denomination: number; count: number }[] = [];
          let remaining = amount;
          const denoms = [100, 50, 20, 10, 5];

          for (let i = 0; i < denoms.length; i++) {
            if (remaining >= denoms[i]) {
              const count = Math.floor(remaining / denoms[i]);
              if (count > 0) {
                bills.push({ denomination: denoms[i], count });
                remaining = remaining - count * denoms[i];
                if (remaining === 0) {
                  this.balance -= amount;
                  return { bills, success: true };
                } else {
                  if (i === denoms.length - 1 && remaining > 0) {
                    return {
                      bills: [],
                      success: false,
                      errorMessage: "Cannot dispense exact amount",
                    };
                  } else {
                    continue;
                  }
                }
              }
            }
          }

          this.balance -= amount;
          return { bills, success: true };
        })();
  }

  getBalance(): number {
    return this.balance;
  }
}

export { DirtyATM };
