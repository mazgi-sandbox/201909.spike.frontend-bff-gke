import DefaultPageTemplate from 'components/templates/DefaultPageTemplate'
import ObjectStorageListOrganism from 'components/organisms/ObjectStorageListOrganism'
import React from 'react'

const Page: () => JSX.Element = () => {
  return (
    <DefaultPageTemplate title="Object Storages">
      <ObjectStorageListOrganism />
    </DefaultPageTemplate>
  )
}

export default Page
