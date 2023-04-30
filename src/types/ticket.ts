export enum TicketStatus {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}

export function getTicketStatusReadable(status: TicketStatus): string {
  switch (status) {
    case TicketStatus.TO_DO:
      return "To Do";
    case TicketStatus.IN_PROGRESS:
      return "In Progress";
    case TicketStatus.IN_REVIEW:
      return "In Review";
    case TicketStatus.DONE:
      return "Done";
  }
}
