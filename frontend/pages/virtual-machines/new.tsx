import DefaultPageTemplate from 'components/templates/DefaultPageTemplate'
import { Form } from 'components/organisms/VirtualMachineCreateFormOrganism'
import React from 'react'

const Page: () => JSX.Element = () => {
  return (
    <DefaultPageTemplate title="Create a new Virtual Machine">
      <Form />
    </DefaultPageTemplate>
  )
}

export default Page
