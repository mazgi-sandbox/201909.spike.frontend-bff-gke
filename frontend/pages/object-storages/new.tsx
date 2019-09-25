import DefaultPageTemplate from 'components/templates/DefaultPageTemplate'
import { Form } from 'components/organisms/ObjectStorageCreateFormOrganism'
import React from 'react'

const Page: () => JSX.Element = () => {
  return (
    <DefaultPageTemplate title="Create a new Object Storage">
      <Form />
    </DefaultPageTemplate>
  )
}

export default Page
