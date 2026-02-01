// components/member-table.tsx
import { cn } from "@/lib/utils";
import { Loader } from "@/components";
import { Badge } from "@/components/ui/badge";
import { INVITATION_STATUS_COLORS, MEMBER_ROLE_COLORS } from "@/constants";
import { InvitationStatus, Member, MemberRole } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useProject from "@/hooks/use-project";
import MemberActions from "./member-actions";
import { Crown, Shield, Users, Mail } from "lucide-react";

interface MemberTableProps {
  members: Member[];
  isLoading: boolean;
  refetchMembers: () => void;
}

export default function MemberTable({
  members,
  isLoading,
  refetchMembers,
}: MemberTableProps) {
  const { project } = useProject();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader />
      </div>
    );
  }

  const owner = members.find((m) => m.role === MemberRole.OWNER);
  const admins = members.filter((m) => m.role === MemberRole.ADMIN);
  const crew = members.filter((m) => m.role === MemberRole.MEMBER);

  return (
    <div className="space-y-8">
      {owner && (
        <section className="flex justify-center">
          <div className="relative w-full max-w-xs rounded-2xl border bg-gradient-to-br from-primary/10 to-card p-4 shadow-md">
            <Crown className="absolute -top-3 left-1/2 -translate-x-1/2 size-7 text-primary" />

            <div className="flex flex-col items-center gap-2 pt-3">
              <Avatar className="size-12 ring-2 ring-primary">
                <AvatarImage src={owner.user?.avatar?.url} />
                <AvatarFallback>{owner.user?.fullName?.[0]}</AvatarFallback>
              </Avatar>

              <div className="text-center">
                <p className="font-semibold text-sm">{owner.user.fullName}</p>
                <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                  <Mail size={10} />
                  {owner.email}
                </p>
              </div>

              <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5">
                Project Owner
              </Badge>
            </div>
          </div>
        </section>
      )}

      {!!admins.length && (
        <section className="">
          <div className="flex items-center gap-2 mb-3 text-sm font-semibold">
            <Shield size={16} className="text-primary" />
            Admin Command
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {admins.map((admin) => (
              <div
                key={admin._id}
                className="border bg-zinc-50 rounded-xl p-4 flex items-center justify-between bg-card hover:border-primary/60 transition"
              >
                <div className="flex  items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarImage src={admin.user?.avatar?.url} />
                    <AvatarFallback>{admin.user?.fullName?.[0]}</AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-sm font-medium">{admin.user.fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      {admin.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={MEMBER_ROLE_COLORS[admin.role]}>
                    Admin
                  </Badge>

                  {project?.role === MemberRole.OWNER && (
                    <MemberActions
                      role={admin.role}
                      memberId={admin._id!}
                      refetchMembers={refetchMembers}
                      projectId={project.projectId}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {!!crew.length && (
        <section>
          <div className="flex items-center gap-2 mb-3 text-sm font-semibold">
            <Users size={16} />
            Team Members
          </div>

          <div className="divide-y border rounded-xl">
            {crew.map((member) => {
              const isAccepted =
                member.invitationStatus === InvitationStatus.ACCEPTED;

              return (
                <div
                  key={member._id}
                  className="flex items-center justify-between py-2 px-4 hover:bg-muted/40 transition"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      {isAccepted ? (
                        <>
                          <AvatarImage src={member.user?.avatar?.url} />
                          <AvatarFallback>
                            {member.user?.fullName?.[0]}
                          </AvatarFallback>
                        </>
                      ) : (
                        <AvatarFallback>
                          <Mail size={12} />
                        </AvatarFallback>
                      )}
                    </Avatar>

                    <div>
                      <p className="text-sm font-medium">
                        {isAccepted ? member.user.fullName : member.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {member.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      className={cn(
                        INVITATION_STATUS_COLORS[member.invitationStatus!],
                        "text-xs"
                      )}
                    >
                      {member.invitationStatus}
                    </Badge>

                    {project?.role === MemberRole.OWNER && (
                      <MemberActions
                        role={member.role}
                        memberId={member._id!}
                        refetchMembers={refetchMembers}
                        projectId={project.projectId}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
