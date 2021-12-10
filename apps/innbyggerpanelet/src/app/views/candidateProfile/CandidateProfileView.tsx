import { Button, Heading } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import CandidateProfileInfo from '../../components/candidateProfile/CandidateProfileInfo'
import CandidateProperties from '../../components/candidateProfile/CandidateProperties'

export default function CandidateProfileView(): ReactElement {
    return (
        <div className="candidate-profile-view">
            <div className="candidate-view-header">
                <Heading size="xlarge">Din profil</Heading>
                <Button>Ta kontakt</Button>
            </div>
            <CandidateProfileInfo />
            <Heading size="medium">Egenskaper</Heading>
            <CandidateProperties />
        </div>
    )
}