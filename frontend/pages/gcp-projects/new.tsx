import DefaultPageTemplate from 'components/templates/DefaultPageTemplate'
import { Form } from 'components/organisms/GCPProjectRegisterFormOrganism'
import React from 'react'

const Page: () => JSX.Element = () => {
  return (
    <DefaultPageTemplate title="Register a new GCP project">
      <Form />
    </DefaultPageTemplate>
  )
}

export default Page
