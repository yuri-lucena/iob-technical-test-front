import {
  Dropdown,
  DropdownOptions,
  Header,
  TransactionForm,
} from "@/components";
import { BankAccount, BankLaunch } from "@/interfaces";
import { bankAccountService } from "@/services";
import { useEffect, useState } from "react";
import { bankLaunchService } from "@/services";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(
    null
  );
  const [launchHistoryGrid, setLaunchHistoryGrid] = useState<
    BankLaunch[] | null
  >([]);

  useEffect(() => {
    const getAllUserAccounts = async () => {
      try {
        const response = await bankAccountService.getAllUserAccounts();
        setAccounts(response ?? []);
      } catch (error) {
        console.error(error);
      }
    };
    getAllUserAccounts();
  }, []);

  const updateLaunchHistoryGrid = async (id: number) => {
    try {
      const response = await bankLaunchService.getAllLaunchHistory(id);

      setLaunchHistoryGrid(response.data ?? []);
    } catch (error) {
      console.error(error);
    }
  };

  const people = [
    {
      name: "Leslie Alexander",
      email: "leslie.alexander@example.com",
      role: "Co-Founder / CEO",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
    },
    {
      name: "Michael Foster",
      email: "michael.foster@example.com",
      role: "Co-Founder / CTO",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
    },
    {
      name: "Dries Vincent",
      email: "dries.vincent@example.com",
      role: "Business Relations",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: null,
    },
    {
      name: "Lindsay Walton",
      email: "lindsay.walton@example.com",
      role: "Front-end Developer",
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
    },
    {
      name: "Courtney Henry",
      email: "courtney.henry@example.com",
      role: "Designer",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "2023-01-23T13:23Z",
    },
    {
      name: "Tom Cook",
      email: "tom.cook@example.com",
      role: "Director of Product",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: null,
    },
  ];

  return (
    <div>
      <title>Iob Bank - Início</title>

      <Header />
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center text-base/7 font-semibold text-pink-600">
            Iob Bank - A liberdade de gerenciar suas finanças em um só lugar
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-pretty text-center text-4xl font-medium tracking-tight text-gray-950 sm:text-5xl">
            Tudo o que você precisa está aqui!
          </p>
          <div className="mt-10 flex gap-4 sm:mt-16 justify-center">
            {/* Saldo em conta */}
            <div
              className="relative lg:row-span-2"
              style={{ maxWidth: "350px", width: "100%" }}
            >
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Selecione uma conta
                  </p>
                  <Dropdown
                    value={selectedAccount?.id}
                    id="conta"
                    onChange={(value) => {
                      setSelectedAccount(
                        accounts.find((account) => account.id === value) ?? null
                      );
                      updateLaunchHistoryGrid(value);
                    }}
                    textWhenSelected={`${selectedAccount?.type} - ${selectedAccount?.id}`}
                    textWhenNotSelected="Selecione uma conta"
                  >
                    {accounts.map((account) => (
                      <DropdownOptions key={account.id} value={account.id}>
                        <div className="flex items-center">
                          <span className="block truncate font-normal group-data-[selected]:font-semibold">
                            {`${account.type} - ${account.id}`}
                          </span>
                        </div>
                      </DropdownOptions>
                    ))}
                  </Dropdown>
                </div>

                <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                  <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-pink-700 bg-pink-950 shadow-2xl p-5">
                    <div className="flex flex-wrap place-content-center">
                      <p className="text-lg/7 font-medium tracking-tight">
                        Saldo total em conta
                      </p>

                      {selectedAccount && (
                        <div className="mt-4">
                          <span className="text-2xl font-bold text-white ">
                            {selectedAccount
                              ? `R$ ${selectedAccount.balance.toLocaleString(
                                  "pt-BR",
                                  { minimumFractionDigits: 2 }
                                )}`
                              : ""}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
            </div>

            {/* Histórico de transações */}
            <div
              className="relative lg:row-span-2"
              style={{ maxWidth: "350px", width: "100%" }}
            >
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Histórico de transações
                  </p>
                </div>
                <div className="flex flex-1 items-start justify-center mt-10 px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2 overflow-x-auto overflow-y-auto">
                  <ul role="list" className="divide-y divide-gray-100">
                    {launchHistoryGrid?.length === 0 && (
                      <p className="text-lg/7 font-medium tracking-tight text-gray-950 max-lg:text-center">
                        Nenhuma transação encontrada
                      </p>
                    )}

                    {launchHistoryGrid?.map((launch) => (
                      <li
                        key={launch.id}
                        className="flex justify-between gap-x-6 py-5"
                      >
                        <div className="flex min-w-0 gap-x-4">
                          {launch.operationTypeId === 1 && (
                            <ArrowDownIcon className=" text-pink-700 min-h-5 min-w-5 rounded-full" />
                          )}
                          {launch.operationTypeId === 2 && (
                            <ArrowUpIcon className="text-pink-700 min-h-5 min-w-5 rounded-full" />
                          )}
                          {launch.operationTypeId === 3 && (
                            <ArrowDownIcon className="text-pink-700 min-h-5 min-w-5 rounded-full" />
                          )}
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {launch.operationTypeId === 1 && (
                                <span className="text-gray-700">Crédito</span>
                              )}
                              {launch.operationTypeId === 2 && (
                                <span className="text-gray-700">Débito</span>
                              )}
                              {launch.operationTypeId === 3 && (
                                <span className="text-gray-700">
                                  Transferência
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            {`R$ ${launch.value.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}`}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-gray-500">
                            Data da transação:{" "}
                            {new Intl.DateTimeFormat("pt-BR", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            }).format(new Date(launch.created!))}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col flex-wrap gap-8  justify-start items-center  pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
