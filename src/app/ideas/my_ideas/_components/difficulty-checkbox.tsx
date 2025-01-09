import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter, useSearchParams } from "next/navigation";


export const DifficultyFilterCheckbox = () => {

    const router = useRouter()
    const searchParams = useSearchParams();

    const handleDifficultyParams = (diff?: string) => {

        if (!diff) {
            router.push(`/ideas/my_ideas`)
            return;
        }

        if (searchParams.has("technology")) {
            router.push(`/ideas/my_ideas?difficulty=${diff}&technology=${searchParams.get("technology")}`)
        } else {
            router.push(`/ideas/my_ideas?difficulty=${diff}`)
        }

    }

    return (
        <RadioGroup className="flex space-x-3" defaultValue="all">
            <div className="flex items-center space-x-2" onClick={() => handleDifficultyParams()}>
                <RadioGroupItem
                    value="all"
                    id="all"
                />
                <Label htmlFor="all">All</Label>
            </div>
            <div className="flex items-center space-x-2" onClick={() => handleDifficultyParams("easy")}>
                <RadioGroupItem
                    value="easy"
                    id="easy"
                />
                <Label htmlFor="easy">Easy</Label>
            </div>
            <div className="flex items-center space-x-2" onClick={() => handleDifficultyParams("medium")}>
                <RadioGroupItem
                    value="medium"
                    id="medium"
                />
                <Label htmlFor="medium">Medium</Label>
            </div>
            <div className="flex items-center space-x-2" onClick={() => handleDifficultyParams("hard")}>
                <RadioGroupItem
                    value="hard"
                    id="hard"
                />
                <Label htmlFor="hard">Hard</Label>
            </div>
        </RadioGroup>
    );
};
