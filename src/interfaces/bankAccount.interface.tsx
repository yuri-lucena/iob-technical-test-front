interface BankAccount {
  id?: number;
  balance: number;
  type?: string;
  active: boolean;
  openingDate?: Date;
  lastTransactionDate?: Date;
  userId: number;
}

export default BankAccount;
