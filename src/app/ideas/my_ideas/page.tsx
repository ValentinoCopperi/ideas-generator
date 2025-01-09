import { getSavedIdeasAction, getSavedTechnologiesAction } from "@/actions/ideas/ideas"
import Container from "@/components/Container";
import { IdeasGrid } from "./_components/ideas-grid";
import { FilterCard } from "./_components/filters-card";
import { SavedProjectsProvider } from "@/context/saved-projects";

interface MyIdeasProps {
    searchParams?: {
        technology?: string;
        difficulty?: string;
        query? : string
    };
}

const MyIdeas = async ({ searchParams }: MyIdeasProps) => {


    const saved_projects = await getSavedIdeasAction(await searchParams)
    const used_technologies = await getSavedTechnologiesAction()


    return (
        <SavedProjectsProvider>
            <Container classname="px-6 lg:p-0">
                <h1 className="text-3xl font-bold text-center mt-6 mb-4">
                    My Saved Project Ideas
                </h1>
                <p className="text-center max-w-lg mx-auto mb-8">
                    Here are the ideas you have saved for your next big project. Explore them, refine them, and bring them to life!
                </p>

                <div className="w-full flex flex-col lg:flex-row min-h-[600px] space-y-4 lg:space-y-0">
                    <FilterCard technologies={used_technologies} />
                    <IdeasGrid saved_projects={saved_projects} />
                </div>
            </Container>
        </SavedProjectsProvider>
    );
};

export default MyIdeas