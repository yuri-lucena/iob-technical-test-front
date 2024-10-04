import { useState, useEffect } from "react";
import { BankAccount, BankLaunch } from "@/interfaces";
import { bankAccountService, bankLaunchService } from "@/services";
import { Dropdown, DropdownOptions, Input } from "@/components";
import { toast } from "react-toastify";
import CurrencyInput from "react-currency-input-field";
import { Response } from "@/classes/response";

export default function TransactionForm({
  useFormStyle,
  ...props
}: {
  useFormStyle: boolean;
  [key: string]: any;
}) {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(
    null
  );
  const [destinationAccount, setDestinationAccount] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    getAllUserAccounts();
  }, []);

  const getAllUserAccounts = async () => {
    try {
      const response = await bankAccountService.getAllUserAccounts();
      setAccounts(response ?? []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTransactionTypeChange = (value: any) => {
    setTransactionType(value);
    if (value === "1" || value === "2") {
      setDestinationAccount("");
    }
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
  };

  const handleDestinationAccountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDestinationAccount(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let request = {
        originAccountId: selectedAccount?.id,
        destinationAccountId: Number(null),
        operationTypeId: Number(transactionType),
        value: parseFloat(amount.replace(",", ".")),
      };
      let response: Response<boolean> = new Response(false);
      switch (transactionType) {
        case "1":
          try {
            request.destinationAccountId = Number(selectedAccount?.id);
            response = await bankLaunchService.createCreditLaunch(request);
            if (response.data) toast.success("Transação concluída com sucesso");
          } catch (error: any) {
            toast.error(error.response.data.error_message);
            throw error;
          }
          break;
        case "2":
          try {
            request.destinationAccountId = Number(selectedAccount?.id);
            response = await bankLaunchService.createDebitLaunch(request);
            if (response.data) toast.success("Transação concluída com sucesso");
          } catch (error: any) {
            toast.error(error.response.data.error_message);
            throw error;
          }
          break;
        case "3":
          try {
            request.destinationAccountId = Number(destinationAccount);
            response = await bankLaunchService.createTransferLaunch(request);
            if (response.data) toast.success("Transação concluída com sucesso");
          } catch (error: any) {
            toast.error(error.response.data.error_message);
            throw error;
          }
          break;
        default:
          break;
      }

      if (response.data) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        window.document.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTransactionTypeString = (transactionType: string) => {
    switch (transactionType) {
      case "1":
        return "Crédito";
      case "2":
        return "Débito";
      case "3":
        return "Transferência";
      default:
        return "Selecione uma opção";
    }
  };

  return (
    <form
      className={`flex flex-col ${
        useFormStyle
          ? "bg-slate-50 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 gap-3"
          : ""
      }`}
      style={{ width: 600 }}
      onSubmit={handleSubmit}
    >
      <div>
        <h2 className="text-gray-700 font-bold text-xl mb-7">
          Realizar transação
        </h2>

        <Dropdown
          value={transactionType}
          id="transactionType"
          onChange={handleTransactionTypeChange}
          label="Tipo de transação"
          textWhenNotSelected="Selecione uma transação"
          textWhenSelected={getTransactionTypeString(transactionType)}
        >
          <DropdownOptions key="" value="">
            <div className="flex items-center">
              <span className="block truncate font-normal group-data-[selected]:font-semibold">
                Selecione uma opção
              </span>
            </div>
          </DropdownOptions>
          <DropdownOptions key="3" value="3">
            <div className="flex items-center">
              <span className="block truncate font-normal group-data-[selected]:font-semibold">
                Transferência
              </span>
            </div>
          </DropdownOptions>
          <DropdownOptions key="1" value="1">
            <div className="flex items-center">
              <span className="block truncate font-normal group-data-[selected]:font-semibold">
                Crédito
              </span>
            </div>
          </DropdownOptions>
          <DropdownOptions key="2" value="2">
            <div className="flex items-center">
              <span className="block truncate font-normal group-data-[selected]:font-semibold">
                Débito
              </span>
            </div>
          </DropdownOptions>
        </Dropdown>
      </div>
      <div className="gap-16">
        <Dropdown
          value={selectedAccount?.id}
          id="conta"
          onChange={(value) =>
            setSelectedAccount(
              accounts.find((account) => account.id === value) ?? null
            )
          }
          label="Conta"
          textWhenSelected={`${selectedAccount?.type} - ${
            selectedAccount?.id
          } - R$ ${selectedAccount?.balance.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`}
          textWhenNotSelected="Selecione uma conta"
        >
          {accounts.map((account) => (
            <DropdownOptions key={account.id} value={account.id}>
              <div className="flex items-center">
                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                  {`${account.type} - ${
                    account.id
                  } - R$ ${account.balance.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}`}
                </span>
              </div>
            </DropdownOptions>
          ))}
        </Dropdown>
      </div>
      {transactionType !== "1" && transactionType !== "2" && (
        <div>
          <Input
            id="destinationAccount"
            label="Conta de destino"
            onChange={handleDestinationAccountChange}
            value={destinationAccount}
            key={"destinationAccount"}
          />
        </div>
      )}
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="value"
        >
          Valor:
        </label>
        <CurrencyInput
          id="value"
          name="value"
          placeholder="Digite um valor"
          defaultValue={0}
          decimalsLimit={2}
          decimalSeparator=","
          groupSeparator="."
          prefix="R$ "
          onValueChange={(value, name) => handleAmountChange(value!)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-pink-300 focus:ring-pink-500 placeholder:text-gray-400  sm:text-sm sm:leading-6 p-3"
        />
      </div>
      <div className="flex items-center gap-3 justify-end mt-10">
        <button
          className="flex justify-center rounded-md bg-pink-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
          type="submit"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}
