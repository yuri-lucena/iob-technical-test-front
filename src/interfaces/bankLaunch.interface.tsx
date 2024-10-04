export default interface BankLaunch {
  id?: number;
  value: number;
  originAccountId?: number;
  destinationAccountId?: number;
  operationTypeId: number;
  date?: Date;
  created?: Date;
}
