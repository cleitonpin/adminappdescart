import React from "react"

import { Container } from "./style"

const Retangle = ({ backgroud, children }) => {
  return (
    <Container backgroud={backgroud}>
      {children}
    </Container>
  )
}

export { Retangle }