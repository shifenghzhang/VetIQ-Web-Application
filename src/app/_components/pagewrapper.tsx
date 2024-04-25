import { ReactNode } from "react";

const PageWrapper = ({children}: {children: ReactNode}) => {
    return(
        <div className="flex-grow text-black p-2 mt-16 pl-[16.6rem]">
            {children}
        </div>
    )
}

export default PageWrapper;