import { useMemo, useState, useEffect } from "react";
import { MemberRole } from "@/types";
import { Pagination, SearchInput } from "@/components";
import useProject from "@/hooks/use-project";

import CreateTeam from "./components/create-team";
import useGetTeams from "./hooks/use-get-teams";
import useGetTeamsFilters from "./hooks/use-get-teams-filters";
import { useUpdateDocumentTitle } from "@/hooks";

import TeamList from "./components/team-list";
import TeamPreview from "./components/team-preview";

const ProjectTeams = () => {
  const { page, limit, name, setFilters } = useGetTeamsFilters();
  const { project } = useProject();

  const {
    isLoading,
    teams,
    refetch,
    total,
    totalPages,
    hasNextPage,
    hasPrevPage,
  } = useGetTeams({
    projectId: project?.projectId as string,
  });

  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  useEffect(() => {
    if (teams?.length && !selectedTeamId) {
      setSelectedTeamId(teams[0]._id);
    }
  }, [teams, selectedTeamId]);

  const activeTeam = useMemo(
    () => teams?.find((t) => t._id === selectedTeamId) ?? null,
    [teams, selectedTeamId]
  );

  useUpdateDocumentTitle({
    title: `Teams - ${project?.name}`,
  });

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 bg-muted/30 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-base font-medium">Project Teams</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-foreground text-card">
            {total}
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <SearchInput
            fn={(name?: string) => setFilters({ name })}
            text={name ? name : ""}
            placeholder="Search all teams"
          />

          {project?.role !== MemberRole.MEMBER && (
            <CreateTeam
              refetch={refetch}
              projectId={project?.projectId as string}
            />
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2.2fr_3fr]">
        <div className="flex flex-col gap-3">
          <TeamList
            teams={teams}
            isLoading={isLoading}
            refetchTeams={refetch}
            selectedTeamId={selectedTeamId}
            onSelectTeam={setSelectedTeamId}
          />

          {!!teams?.length && (
            <Pagination
              setFilters={setFilters}
              page={page ? page : 1}
              limit={limit ? limit : 10}
              totalPages={totalPages}
              hasNextPage={!hasNextPage}
              hasPrevPage={!hasPrevPage}
            />
          )}
        </div>

        <TeamPreview
          team={activeTeam}
          projectId={project?.projectId as string}
        />
      </div>
    </div>
  );
};

export default ProjectTeams;
