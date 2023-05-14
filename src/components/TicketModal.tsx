import type { TicketStatus } from "~/types/ticket";
import { getTicketStatusReadable } from "~/types/ticket";
import type { RouterOutputs } from "../utils/api";

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
          <div className="flex items-center gap-4">
            <div className="text-xl font-bold">{ticket.title}</div>
            <div
              style={{
                display: "inline-block",
                backgroundColor: "#1C4E80",
                borderRadius: "5px",
                padding: "5px 10px",
                color: "#B8DCFF",
              }}
            >
              {getTicketStatusReadable(ticket.status as TicketStatus)}
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="font-bold">Points: </div>
            <div className="ml-1">{ticket.points}</div>
          </div>
          <div className="mt-4 font-bold">Description</div>
          <p>{ticket.content}</p>
          <div className="card-actions mx-2 mt-4 flex justify-end">
            <button className="btn-accent btn-xs btn px-5" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
