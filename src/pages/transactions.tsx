import { Header, TransactionForm } from "@/components";

export default function TransactionsPage() {
  return (
    <div>
      <title>Iob Bank - Transações</title>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <TransactionForm useFormStyle={true} />
      </div>
    </div>
  );
}
