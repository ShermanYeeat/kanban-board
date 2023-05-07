import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { getTicketStatusReadable, type TicketStatus } from "~/types/ticket";
import { type RouterOutputs } from "../utils/api";
import { TicketModal } from "./TicketModal";
import { UpdateTicketStatus } from "./UpdateTicketStatus";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl ">
      <div className="grid grid-cols-12">
        <div className="col-span-11">
          <div className="card-body m-0 p-3">
            <div onClick={() => toggleModal()} style={{ cursor: "pointer" }}>
              <div className="text-l collapse-title font-bold">
                {ticket.title} -{" "}
                {getTicketStatusReadable(ticket.status as TicketStatus)}
              </div>
              <div className="collapse-content">
                <article className="prose lg:prose-xl">
                  <ReactMarkdown>{ticket.content}</ReactMarkdown>
                </article>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 mt-2">
          <UpdateTicketStatus
            ticketStatus={ticket.status as TicketStatus}
            onUpdate={onUpdate}
            isDropdownOpen={isDropdownOpen}
            onToggle={toggleDropdown}
          />
        </div>
      </div>

      <TicketModal
        ticket={ticket}
        isModalOpen={isModalOpen}
        onToggle={toggleModal}
        onDelete={onDelete}
      />
    </div>
  );
};
