import CreateMenu from "@/components/CreateMenu";
import CreateMenuNav from "@/components/CreateMenuNav";
import FormField from "@/components/FormField";
import ProjectForm from "@/components/ProjectForm";
import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";

const CreateProject = async () => {
  const session = await getCurrentUser();

  //cheacking is user exists
  if (!session?.user) redirect("/");

  return (
    <div>
      <CreateMenu>
        <h3 className="modal-head-text">Create Project</h3>
        <ProjectForm type="create" session={session} />
      </CreateMenu>
    </div>
  );
};

export default CreateProject;
