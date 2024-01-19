import { PropsWithChildren, ReactNode } from "react";
import { Text } from "@radix-ui/themes";
interface Props {
    children: ReactNode
}

export const ErrorMessage = ({ children } : PropsWithChildren) =>{
    return(
        <Text color="red" as="p">{children}</Text>
    )
}