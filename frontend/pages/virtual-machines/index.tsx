import DefaultPageTemplate from 'components/templates/DefaultPageTemplate'
import List from 'components/organisms/VirtualMachineListOrganism'
import React from 'react'

const Page: () => JSX.Element = () => {
  return (
    <DefaultPageTemplate title="Virtual Machines">
      <List />
    </DefaultPageTemplate>
  )
}

export default Page
