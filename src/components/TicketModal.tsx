import { type RouterOutputs } from "../utils/api";

type Ticket = RouterOutputs["ticket"]["getAll"][0];

export const TicketModal = ({ ticket }: { ticket: Ticket }) => {
  // const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">header</h3>
          <p className="py-4">paragraph</p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              label
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
