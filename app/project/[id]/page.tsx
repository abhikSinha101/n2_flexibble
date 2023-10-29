import { ProjectInterface } from "@/common.types";
import { getProjectDetails } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const Project = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const result = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };
  const projectDetails = result?.project;
  const renderLink = () => `/profile/${projectDetails?.createdBy?.id}`;

  const gitLink = projectDetails?.githubUrl as string;
  const linkedInLink = projectDetails?.githubUrl as string;

  if (!result?.project) {
    <p>faied</p>;
  }
  console.log(result?.project);

  return (
    <>
      <Navbar />

      <div className="flex flex-col w-full py-8 px-36 gap-4">
        {/**tite createdby image */}

        <div className="flex flex-row w-full gap-4 mt-6 justify-between">
          <div className="flex flex-row gap-4 ">
            <Link href={renderLink()}>
              <Image
                src={projectDetails?.createdBy?.avatarUrl}
                width={50}
                height={50}
                alt="profile"
                className="rounded-full"
              />
            </Link>

            <div className="flex flex-col gap-1 text-left">
              <div className="text-base font-medium ">
                {projectDetails?.createdBy?.name}
              </div>
              <div className="text-sm">{projectDetails?.createdBy?.email}</div>
            </div>
          </div>

          <div className="flex items-center text-center text-2xl capitalize">
            {projectDetails?.title}
          </div>
        </div>

        <div className="form_image-container text-center ">Image</div>

        <div className="w-full h-full text-center font-medium text-base  ">
          <p>{projectDetails?.description}</p>
          <div className="flex flex-row  place-content-center  gap-4 p-6 font-light ">
            <Link href={gitLink} className="underline-offset-1">
              Github
            </Link>
            <Link href={linkedInLink} className="underline-offset-1">
              Linkedin
            </Link>
          </div>
          <p>{projectDetails?.githubUrl}</p>
          <p>{projectDetails?.liveSiteUrl}</p>
        </div>
      </div>
    </>
  );
};

export default Project;
