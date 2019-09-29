import DefaultPageTemplate from 'components/templates/DefaultPageTemplate'
import { Form } from 'components/organisms/LoginFormOrganism'
import React from 'react'

const Page: () => JSX.Element = () => {
  return (
    <DefaultPageTemplate title="Sign in" signInRequired={false}>
      <Form />
    </DefaultPageTemplate>
  )
}

export default Page
