import Container from "@/components/Container";
import { IdeasProvider } from "@/context/ideas-context";
import GenerateForm from "./_components/generator-form";
import CardList from "./_components/card-list";
import { SavedProjectsProvider } from "@/context/saved-projects";



const Ideas = async () => {

    return ( 
        <IdeasProvider>
            <SavedProjectsProvider>
                <Container classname="flex-1 flex flex-col lg:flex-row py-4 gap-4 px-4 sm:px-0" >
                    <GenerateForm/>
                    <CardList/>
                </Container>
            </SavedProjectsProvider>
        </IdeasProvider>
     );
}
 
export default Ideas;