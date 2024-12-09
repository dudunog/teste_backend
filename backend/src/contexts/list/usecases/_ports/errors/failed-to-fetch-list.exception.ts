export class FailedToFetchListException extends Error {
  constructor() {
    super("Failed to fetch list.");
    this.name = "FailedToFetchList";
  }
}
