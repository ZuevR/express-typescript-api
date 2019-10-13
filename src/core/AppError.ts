export class AppHttpError extends Error {

  constructor(message: string, public statusCode: number) {
    super(message);
  }

}
