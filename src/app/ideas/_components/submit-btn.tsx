import { Button } from "@/components/ui/button"
import { Loader2Icon, Sparkles } from "lucide-react"
import { useFormStatus } from "react-dom"


interface Props {
  content : string
  pendingContent : string
  pendingData? : boolean
}

const SubmitBtn = ( {content , pendingContent , pendingData} : Props ) => {

  const { pending } = useFormStatus()

  return (
    <Button
      className='w-full flex items-center gap-2'
      size='lg'
      type='submit'
      disabled={pending}
    >
      {pending || pendingData ?
        <>
          <Loader2Icon className='size-4 animate-spin' />
          <span> {pendingContent} </span>
        </> :
        <>
          <Sparkles className='size-4' />
          <span> {content} </span>
        </>
      }
    </Button>
  )
}

export default SubmitBtn