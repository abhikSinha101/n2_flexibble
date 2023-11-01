import { ProjectInterface } from "@/common.types";
import { getProjectDetails } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import RelatedProjects from "@/components/RelatedProjects";
import ProjectActions from "@/components/ProjectActions";

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

      <div className="project_creator-page">
        {/**tite createdby image */}

        <div className="flexBetween w-full">
          <div className="flex flex-row gap-4 ">
            <Link href={renderLink()}>
              <Image
                src={`${projectDetails?.createdBy?.avatarUrl}`}
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

            <div className="flex-grow border-l border-gray-50"></div>

            <div className="flex items-center text-2xl normal-case subpixel-antialiased">
              {projectDetails?.title}
            </div>
          </div>

          {/**only for creator to see */}
          {session?.user?.email === projectDetails?.createdBy?.email && (
            <div className="flex justify-end items-center gap-2">
              <ProjectActions projectId={projectDetails?.id} />
            </div>
          )}
        </div>

        <section className="mt-14">
          <Image
            src={`${projectDetails?.image}`}
            className="object-cover rounded-2xl"
            width={1064}
            height={798}
            alt="poster"
          />
        </section>

        <div className="project_creator-description ">
          <div className="text-center py-2 pb-8">
            <p>{projectDetails?.description}</p>
          </div>

          <div className="project_creator-links">
            <div className="flex-grow border-t border-gray-100"></div>
            <Link
              href={gitLink}
              className="underline underline-offset-2 text-gray-100"
            >
              <p>Github</p>
            </Link>
            <p className="text-gray-100">•</p>
            <Link
              href={linkedInLink}
              className="underline underline-offset-2 text-gray-100"
            >
              <p>Linkedin</p>
            </Link>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>
        </div>
        <RelatedProjects
          userId={projectDetails?.createdBy?.id}
          projectId={projectDetails?.id}
        />
      </div>
    </>
  );
};

export default Project;
