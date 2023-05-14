import { TicketStatus, getTicketStatusReadable } from "~/types/ticket";

export const UpdateTicketStatus = ({
  ticketStatus,
  onUpdate,
  isDropdownOpen,
  onToggle,
}: {
  ticketStatus: TicketStatus;
  onUpdate: (status: TicketStatus) => void;
  isDropdownOpen: boolean;
  onToggle: () => void;
}) => {
  function TicketStatusList() {
    const statusValues = Object.values(TicketStatus);

    return (
      <div className="border border-gray-300 p-3">
        <div className="text-center font-bold">Set status to</div>
        <ul className="divide-y divide-gray-300 text-xs">
          {statusValues.map((statusValue) => (
            <li
              key={statusValue}
              onClick={() => {
                onToggle();
                onUpdate(statusValue);
              }}
              className={`py-2 ${
                ticketStatus === statusValue ? "disabled" : ""
              }`}
            >
              <div>{getTicketStatusReadable(statusValue)}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-right">
      <label
        tabIndex={0}
        className="btn-ghost btn-xs btn-circle btn text-info"
        onClick={() => onToggle()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-more-vertical h-4 w-4"
        >
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </svg>
      </label>
      <ul
        tabIndex={0}
        className={`dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow ${
          isDropdownOpen ? "" : "hidden"
        }`}
      >
        {TicketStatusList()}
      </ul>
    </div>
  );
};
