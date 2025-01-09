
import Link from "next/link"
import Container from "../Container"
import { ModeToggle } from "./components/mode-toggle"
import { SavedIdeasButton } from "./components/saved-ideas-button"
import { AuthButton } from "./components/auth-button"
import ProfileButton from "./components/profile-button"

const Header =  () => {

    
    
   return (
    <header className='border-b border-border shadow' >
        <Container classname="flex justify-between items-center p-4">
            <Link
                href={"/"}
                className="font-semibold text-2xl"
            >
                NextIdea
            </Link>
            <div className="space-x-2">
                <SavedIdeasButton/>
                <ModeToggle/>
                <ProfileButton/>
                <AuthButton/>
            </div>
        </Container>
    </header>
  )
}

export default Header