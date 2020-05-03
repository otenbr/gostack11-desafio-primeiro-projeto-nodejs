import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (accumulator, item) => {
        switch (item.type) {
          case 'income':
            accumulator.income += item.value;
            accumulator.total += item.value;
            break;
          case 'outcome':
            accumulator.outcome += item.value;
            accumulator.total -= item.value;
            break;
          default:
        }

        return accumulator;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    return balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
