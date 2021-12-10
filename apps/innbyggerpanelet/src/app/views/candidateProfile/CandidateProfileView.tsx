import { Button, Heading } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import CandidateProfileInfo from '../../components/candidateProfile/CandidateProfileInfo'

export default function CandidateProfileView(): ReactElement {
    return (
        <div>
            <div className="candidate-view-header">
                <Heading size="xlarge">Din profil</Heading>
                <Button>Ta kontakt</Button>
            </div>
            <CandidateProfileInfo />
        </div>
    )
}