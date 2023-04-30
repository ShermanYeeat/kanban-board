

import { type RouterOutputs } from "../utils/api";

type Ticket = RouterOutputs["ticket"]["getAll"][0];

export const TicketModal = ({
  ticket,
}: {
  ticket: Ticket;
}) => {
  // const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <input type="checkbox" id="my-modal" className="modal-toggle" />
    <div className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
        <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
        <div className="modal-action">
          <label htmlFor="my-modal" className="btn">Yay!</label>
        </div>
      </div>
    </div>
  );
};
