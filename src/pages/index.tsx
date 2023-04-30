import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";

import { Header } from "../components/Header";
import { TicketCard } from "../components/TicketCard";
import { TicketEditor } from "../components/TicketEditor";
import { api, type RouterOutputs } from "../utils/api";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>tickettaker</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Content />
      </main>
    </>
  );
};

export default Home;

type Project = RouterOutputs["project"]["getAll"][0];

const Content: React.FC = () => {
  const { data: sessionData } = useSession();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { data: projects, refetch: refetchprojects } =
    api.project.getAll.useQuery(
      undefined, // no input
      {
        enabled: sessionData?.user !== undefined,
        onSuccess: (data) => {
          setSelectedProject(selectedProject ?? data[0] ?? null);
        },
      }
    );

  const createProject = api.project.create.useMutation({
    onSuccess: () => {
      void refetchprojects();
    },
  });

  const { data: tickets, refetch: refetchtickets } = api.ticket.getAll.useQuery(
    {
      projectId: selectedProject?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && selectedProject !== null,
    }
  );

  const createTicket = api.ticket.create.useMutation({
    onSuccess: () => {
      void refetchtickets();
    },
  });

  const deleteTicket = api.ticket.delete.useMutation({
    onSuccess: () => {
      void refetchtickets();
    },
  });

  const updateTicket = api.ticket.updateStatus.useMutation({
    onSuccess: () => {
      void refetchtickets();
    },
  });

  return (
    <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
      <div className="px-2">
        <ul className="menu rounded-box w-56 bg-base-100 p-2">
          {projects?.map((project) => (
            <li key={project.id}>
              <a
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  setSelectedProject(project);
                }}
              >
                {project.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="divider"></div>
        <input
          type="text"
          placeholder="New project"
          className="input-bordered input input-sm w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createProject.mutate({
                title: e.currentTarget.value,
              });
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
      <div className="col-span-3">
        <div>
          {tickets?.map((ticket) => (
            <div key={ticket.id} className="mt-5">
              <TicketCard
                ticket={ticket}
                onDelete={() => void deleteTicket.mutate({ id: ticket.id })}
                onUpdate={(status) =>
                  void updateTicket.mutate({ id: ticket.id, status })
                }
              />
            </div>
          ))}
        </div>

        <TicketEditor
          onSave={({ title, content }) => {
            void createTicket.mutate({
              title,
              content,
              projectId: selectedProject?.id ?? "",
            });
          }}
        />
      </div>
    </div>
  );
};
