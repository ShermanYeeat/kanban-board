import { useState } from "react";

export const TicketCreator = ({
  onSave,
}: {
  onSave: (ticket: { title: string; content: string; points: number }) => void;
}) => {
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [points, setPoints] = useState<number | undefined>(undefined);

  return (
    <div className="card mt-5 w-[400px] border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <input
            type="text"
            placeholder="Ticket title"
            className="input-m input-primary input w-full font-bold"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </h2>
        <input
          type="number"
          placeholder="Points"
          className="input-m input-primary input w-full"
          value={points !== undefined ? points : ""}
          onChange={(e) =>
            setPoints(
              e.currentTarget.value !== ""
                ? Number(e.currentTarget.value)
                : undefined
            )
          }
        />
        <textarea
          value={description}
          placeholder="Ticket description"
          className="input-m input-primary input h-40 w-full resize-y pt-4 text-sm"
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
      </div>
      <div className="card-actions justify-end pb-3 pr-3">
        <button
          onClick={() => {
            onSave({
              title,
              content: description,
              points: points as number,
            });
            setDescription("");
            setTitle("");
            setPoints(undefined);
          }}
          className="btn-primary btn"
          disabled={
            title.trim().length === 0 ||
            description.trim().length === 0 ||
            points === undefined
          }
        >
          Create Ticket
        </button>
      </div>
    </div>
  );
};
