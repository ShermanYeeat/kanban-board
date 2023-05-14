import { useState } from "react";
import { type TicketStatus } from "~/types/ticket";
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
        <div className="col-span-10">
          <div className="text-l collapse-title card-body m-0 p-1 font-bold">
            <div onClick={() => toggleModal()} style={{ cursor: "pointer" }}>
              <div className="text-l collapse-title font-bold">
                {ticket.title}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 mr-2 mt-2 flex flex-col items-end justify-between">
          <UpdateTicketStatus
            ticketStatus={ticket.status as TicketStatus}
            onUpdate={onUpdate}
            isDropdownOpen={isDropdownOpen}
            onToggle={toggleDropdown}
          />

          <div className="m-4 mr-2">
            <div
              className="rounded-full bg-gray-200 px-2"
              style={{
                backgroundColor: "#1C4E80",
                color: "#B8DCFF",
              }}
            >
              {ticket.points}
            </div>
          </div>
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
