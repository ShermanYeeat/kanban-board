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
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1">
              Click
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
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
