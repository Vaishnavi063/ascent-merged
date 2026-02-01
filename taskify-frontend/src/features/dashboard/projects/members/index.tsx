// index.tsx (ProjectMembers)
import MemberTable from "./components/member-table";
import MemberFilters from "./components/member-filters";
import useGetMembers from "./hooks/use-get-members";
import useGetMemberFilters from "./hooks/use-get-member-filters";

import { Pagination } from "@/components";
import { useUpdateDocumentTitle } from "@/hooks";
import useProject from "@/hooks/use-project";

const ProjectMembers = () => {
  const { project } = useProject();
  const { page = 1, limit = 10, setFilters } = useGetMemberFilters();
  const {
    members,
    isLoading,
    total,
    hasNextPage,
    hasPrevPage,
    totalPages,
    refetch,
  } = useGetMembers({});

  useUpdateDocumentTitle({
    title: `Members - ${project?.name}`,
  });

  return (
    <div className="space-y-3">
      <div className="p-3 bg-muted/70 border rounded-xl flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            Project members
          </p>
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-foreground">
              {project?.name ?? "Project"}
            </span>
            <span className="inline-flex items-center rounded-full bg-secondary-foreground text-card px-3 py-0.5 text-xs">
              {total} member{total === 1 ? "" : "s"}
            </span>
          </div>
        </div>

        <div className="flex items-center flex-col sm:flex-row gap-2 sm:gap-3">
          <MemberFilters refetchMembers={refetch} />
        </div>
      </div>

      <MemberTable
        members={members}
        isLoading={isLoading}
        refetchMembers={refetch}
      />

      {/* Pagination */}
      <div className="pt-3">
        <Pagination
          setFilters={setFilters}
          page={page}
          limit={limit}
          totalPages={totalPages}
          hasNextPage={!hasNextPage}
          hasPrevPage={!hasPrevPage}
        />
      </div>
    </div>
  );
};

export default ProjectMembers;
