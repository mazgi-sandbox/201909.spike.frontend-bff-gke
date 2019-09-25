import DefaultPageTemplate from 'components/templates/DefaultPageTemplate'
import GCPProjectListOrganism from 'components/organisms/GCPProjectListOrganism'
import React from 'react'

const Page: () => JSX.Element = () => {
  return (
    <DefaultPageTemplate title="GCP Projects">
      <GCPProjectListOrganism />
    </DefaultPageTemplate>
  )
}

export default Page
