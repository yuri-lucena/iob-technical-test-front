export class Response<T> {
  private _success: boolean;
  private _data: T | null;
  private _error_message: string | null;

  constructor(
    success: boolean,
    data: T | null = null,
    error_message: string | null = null
  ) {
    this._success = success;
    this._data = data;
    this._error_message = error_message;
  }

  public get success(): boolean {
    return this._success;
  }

  public get data(): T | null {
    return this._data;
  }

  public get error_message(): string | null {
    return this._error_message;
  }
}
