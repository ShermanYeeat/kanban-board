import { TicketStatus, getTicketStatusReadable } from "~/types/ticket";
import { type RouterOutputs } from "../utils/api";

type Ticket = RouterOutputs["ticket"]["getAll"][0];

export const TicketModal = ({
  ticket,
  isModalOpen,
  onToggle,
  onDelete,
}: {
  ticket: Ticket;
  isModalOpen: boolean;
  onToggle: () => void;
  onDelete: () => void;
}) => {
  return (
    <>
      <input
        type="checkbox"
        id={`my-modal-${ticket.id}`}
        className="modal-toggle"
        checked={isModalOpen}
        onChange={() => onToggle()}
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={`my-modal-${ticket.id}`}
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="text-xl font-bold">
            {ticket.title} -{" "}
            {getTicketStatusReadable(ticket.status as TicketStatus)}
          </div>
          <p className="py-4">{ticket.content}</p>
          <div className="card-actions mx-2 flex justify-end">
            <button className="btn-warning btn-xs btn px-5" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
