import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionServiceDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({
    title,
    type,
    value,
  }: CreateTransactionServiceDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > balance.total)
      throw Error('Total Balance is not enough to execute the operation.');

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
