import { ProjectInterface } from "@/common.types";
import CreateMenu from "@/components/CreateMenu";
import ProjectForm from "@/components/ProjectForm";
import { getProjectDetails } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";

const EditProject = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  //cheacking is user exists
  if (!session?.user) redirect("/");

  const result = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };

  return (
    <div>
      <CreateMenu>
        <h3 className="modal-head-text">Edit Project</h3>
        <ProjectForm type="edit" session={session} project={result?.project} />
      </CreateMenu>
    </div>
  );
};

export default EditProject;
