import { ProjectInterface } from "@/common.types";
import { fetchAllProjects } from "@/lib/actions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";

type SearchParams = {
  category?: string | null;
  endcursor?: string;
};

type Props = { searchParams: SearchParams };

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({ searchParams: { category, endcursor } }: Props) => {
  const data = (await fetchAllProjects(category, endcursor)) as ProjectSearch;

  const projectsToDisplay = data?.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <>
        <Navbar />
        <Categories />
        <section className="flexStart flex-col paddings">
          <p className="no-result-text text-center">
            No Projects found, lets make some.
          </p>
        </section>
        <Footer />
      </>
    );
  }

  const pagination = data?.projectSearch?.pageInfo;

  return (
    <>
      <Navbar />
      <Categories />
      <section className="flex flex-start flex-col paddings mb-12 gap-16">
        <section className="projects-grid">
          {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
            <ProjectCard
              key={node?.id}
              id={node?.id}
              image={node?.image}
              title={node?.title}
              name={node?.createdBy?.name}
              avatarUrl={node?.createdBy?.avatarUrl}
              userId={node?.createdBy?.id}
            />
          ))}
        </section>

        <LoadMore
          startCursor={pagination?.startCursor}
          endCursor={pagination?.endCursor}
          hasPreviousPage={pagination?.hasPreviousPage}
          hasNextPage={pagination?.hasNextPage}
        />
      </section>
      <Footer />
    </>
  );
};

export default Home;
