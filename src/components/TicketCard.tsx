import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { TicketStatus, getTicketStatusReadable } from "~/types/ticket";
import { type RouterOutputs } from "../utils/api";

type Ticket = RouterOutputs["ticket"]["getAll"][0];

export const TicketCard = ({
  ticket,
  onDelete,
  onUpdate,
}: {
  ticket: Ticket;
  onDelete: () => void;
  onUpdate: (status: TicketStatus) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body m-0 p-3">
        <div
          onClick={() => setIsModalOpen(true)} // open the modal when clicked
          style={{ cursor: "pointer" }} // change cursor to indicate clickability
        >
          <button
            className="btn-warning btn-xs btn px-5"
            onClick={() => onUpdate(TicketStatus.IN_PROGRESS)}
          >
            Update
          </button>
          <div className="dropdown dropdown-right">
            <label
              tabIndex={0}
              className="btn-ghost btn-xs btn-circle btn text-info"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                class="feather feather-more-vertical h-4 w-4"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </label>
            <div
              tabIndex={0}
              className="card dropdown-content compact rounded-box w-64 bg-base-100 shadow"
            >
              <button onClick={() => onUpdate(TicketStatus.IN_PROGRESS)}>
                Update status to In Progress
              </button>
              <button onClick={() => onUpdate(TicketStatus.DONE)}>
                Update status to Done
              </button>
            </div>
          </div>
          <div className="collapse-title text-xl font-bold">
            {ticket.title} - {getTicketStatusReadable(ticket.status)}
          </div>
          <div className="collapse-content">
            <article className="prose lg:prose-xl">
              <ReactMarkdown>{ticket.content}</ReactMarkdown>
            </article>
          </div>
        </div>
      </div>

      <input
        type="checkbox"
        id={`my-modal-${ticket.id}`}
        className="modal-toggle"
        checked={isModalOpen} // control modal visibility with isModalOpen state
        onChange={() => setIsModalOpen(false)} // close modal when unchecked
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
            {ticket.title} - {getTicketStatusReadable(ticket.status)}
          </div>
          <p className="py-4">{ticket.content}</p>
          <div className="card-actions mx-2 flex justify-end">
            <button className="btn-warning btn-xs btn px-5" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
