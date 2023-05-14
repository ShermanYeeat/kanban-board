import type { TicketStatus } from "~/types/ticket";
import type { RouterOutputs } from "../utils/api";
import { TicketCard } from "./TicketCard";

type Ticket = RouterOutputs["ticket"]["getAll"][0];

export const KanbanColumn = ({
  title,
  tickets,
  deleteTicket,
  updateTicket,
}: {
  title: string;
  tickets?: Ticket[];
  deleteTicket: ({ id }: { id: string }) => void;
  updateTicket: ({ id, status }: { id: string; status: TicketStatus }) => void;
}) => {
  return (
    <div className="col-span-1 mx-2">
      <div className="text-center">
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#1C4E80",
            borderRadius: "5px",
            padding: "5px 10px",
            fontWeight: "bold",
            fontSize: "1.4rem",
            color: "#B8DCFF",
          }}
        >
          {title}
        </div>
      </div>

      <div>
        {tickets?.map((ticket) => (
          <div key={ticket.id} className="mt-5">
            <TicketCard
              ticket={ticket}
              onDelete={() => deleteTicket({ id: ticket.id })}
              onUpdate={(status) => updateTicket({ id: ticket.id, status })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
