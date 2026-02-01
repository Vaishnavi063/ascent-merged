import { Loader } from "@/components";
import { Team, Member, MemberRole } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useProject from "@/hooks/use-project";
import DeleteTeam from "./delete-team";
import CreateTeam from "./create-team";
import { cn } from "@/lib/utils";

interface Props {
  teams: Team[];
  isLoading: boolean;
  refetchTeams: () => void;
  selectedTeamId: string | null;
  onSelectTeam: (id: string) => void;
}

const MAX_VISIBLE = 4;

const TeamList = ({
  teams,
  isLoading,
  refetchTeams,
  selectedTeamId,
  onSelectTeam,
}: Props) => {
  const { project } = useProject();

  if (isLoading) return <Loader />;

  if (!teams.length) {
    return (
      <div className="py-10 bg-muted/30 rounded-xl flex flex-col items-center gap-2">
        <span>No teams yet.</span>
        {project?.role !== MemberRole.MEMBER && (
          <CreateTeam
            refetch={refetchTeams}
            projectId={project?.projectId as string}
          />
        )}
      </div>
    );
  }

  return (
    <div className="bg-muted/30 p-2 rounded-2xl space-y-1">
      {teams.map((team) => {
        const isActive = team._id === selectedTeamId;

        return (
          <button
            key={team._id}
            onClick={() => onSelectTeam(team._id)}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition",
              "hover:bg-muted",
              isActive && "bg-primary/10"
            )}
          >
            <div className="h-9 w-9 flex items-center justify-center rounded-full bg-background shadow-sm text-xs font-medium">
              {team.name[0].toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 truncate">
                <span className="text-sm font-medium truncate">
                  {team.name}
                </span>
                <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full">
                  {team.members.length}
                </span>
              </div>

              <div className="text-xs text-left text-muted-foreground truncate mt-0.5">
                {team?.leader?.user?.fullName
                  ? `Lead: ${team.leader.user?.fullName}`
                  : "No leader assigned"}
              </div>
            </div>

            <div className="flex items-center">
              {team.members.slice(0, MAX_VISIBLE).map((member: Member) => (
                <Tooltip key={member._id}>
                  <TooltipTrigger>
                    <Avatar className="size-7 -ml-2 first:ml-0 ring-2 ring-background">
                      <AvatarImage
                        src={member.user?.avatar?.url}
                        alt={member.user?.fullName}
                      />
                      <AvatarFallback>
                        {member.user?.fullName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent className="text-xs">
                    {member.user?.fullName}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            {project?.role !== MemberRole.MEMBER && (
              <DeleteTeam
                refetchTeams={refetchTeams}
                teamId={team._id}
                projectId={project?.projectId as string}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TeamList;
