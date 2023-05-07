import { type RouterOutputs } from "../utils/api";
import { TicketCard } from "./TicketCard";
import { TicketEditor } from "./TicketEditor";

type Ticket = RouterOutputs["ticket"]["getAll"][0];
type Project = RouterOutputs["project"]["getAll"][0];

export const KanbanColumn = ({
  title,
  project,
  tickets,
  deleteTicket,
  updateTicket,
  saveTicket,
}: {
  title: string;
  project: Project;
  tickets: Ticket[];
  deleteTicket: ({ id: string }) => void;
  updateTicket: ({ id: string, status: TicketStatus }) => void;
  saveTicket: ({ title: string, content: string, projectId: string }) => void;
}) => {
  return (
    <div className="col-span-1">
      <div className="text-center">
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#F0F0F0",
            borderRadius: "5px",
            padding: "5px 10px",
            fontWeight: "bold",
            fontSize: "1.4rem",
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

      {title === "To Do" && (
        <TicketEditor
          onSave={({ title, content }) => {
            saveTicket({ title, content, projectId: project?.id });
          }}
        />
      )}
    </div>
  );
};
