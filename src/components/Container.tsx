import { cn } from "@/lib/utils";
import { type FC } from "react";


interface Props {
    classname? : string;
    children : React.ReactNode
}
 
const Container : FC<Props> = ( { classname , children } ) => {
    return ( 
        <section className={cn('w-full max-w-[1440px] mx-auto', classname)}>
            {children}
        </section>
     );
}

export default Container;
 