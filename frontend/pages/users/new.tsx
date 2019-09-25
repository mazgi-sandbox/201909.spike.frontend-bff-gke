import DefaultPageTemplate from 'components/templates/DefaultPageTemplate'
import { Form } from 'components/organisms/UserCreateFormOrganism'
import React from 'react'

const Page: () => JSX.Element = () => {
  return (
    <DefaultPageTemplate title="Create a new user">
      <Form />
    </DefaultPageTemplate>
  )
}

export default Page
