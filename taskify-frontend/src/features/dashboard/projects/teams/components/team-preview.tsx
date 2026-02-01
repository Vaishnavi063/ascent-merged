import { Team } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MEMBER_ROLE_COLORS } from "@/constants";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Crown, Users } from "lucide-react";

interface Props {
  team: Team | null;
  projectId: string;
}

const TeamPreview = ({ team, projectId }: Props) => {
  if (!team) {
    return (
      <div className="bg-muted/30 rounded-2xl flex items-center justify-center p-6 text-sm text-muted-foreground">
        Select a team to preview details
      </div>
    );
  }

  return (
    <div className="bg-muted/20 rounded-2xl shadow-sm p-6 space-y-4">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h2 className="text-sm font-semibold">{team.name}</h2>
          <div className="mt-1 text-xs text-muted-foreground flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Users className="size-3" />
              {team.members.length} members
            </span>

            {team?.leader?.user?.fullName && (
              <span className="flex items-center gap-1">
                <Crown className="size-3" />
                {team.leader?.user?.fullName}
              </span>
            )}
          </div>
        </div>

        <Link
          to={`/dashboard/setup/${projectId}/teams/${team._id}/details`}
          className="text-xs text-primary hover:underline"
        >
          View details
        </Link>
      </div>

      {team.leader && (
        <div className="flex items-center justify-between border rounded-xl bg-background p-3">
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage
                src={team.leader?.user?.avatar?.url}
                alt={team.leader?.user?.fullName}
              />
              <AvatarFallback>{team.leader?.user?.fullName[0]}</AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm font-medium">
                {team.leader?.user?.fullName}
              </p>
              <p className="text-xs text-muted-foreground">
                {team.leader.email}
              </p>
            </div>
          </div>

          <Badge
            className={cn(MEMBER_ROLE_COLORS[team.leader?.role], "text-[10px]")}
          >
            {team?.leader?.role}
          </Badge>
        </div>
      )}

      <div>
        <p className="text-xs font-medium text-muted-foreground mb-1">
          Members
        </p>

        <div className="space-y-1 max-h-64 overflow-auto">
          {team.members.map((member) => (
            <div
              key={member._id}
              className="flex items-center justify-between px-3 py-2 bg-background rounded-xl hover:bg-muted transition"
            >
              <div className="flex items-center gap-2">
                <Avatar className="size-7">
                  <AvatarImage
                    src={member.user?.avatar?.url}
                    alt={member.user?.fullName}
                  />
                  <AvatarFallback>{member.user?.fullName[0]}</AvatarFallback>
                </Avatar>

                <div>
                  <p className="text-xs font-medium">{member.user?.fullName}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {member?.email}
                  </p>
                </div>
              </div>

              <Badge variant="outline" className="text-[9px]">
                {member?.role}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPreview;
