import { Button as MuiButton } from "@mui/material"
import React from "react"

// TODO - change types from any
const Button = ({children}: any) => {
return(
    <MuiButton>
        {children}
    </MuiButton>
)
}

export default Button