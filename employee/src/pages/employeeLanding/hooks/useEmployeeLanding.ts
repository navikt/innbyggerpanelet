import { isFuture, isWithinInterval, parse } from 'date-fns'
import { useInsightProjectByCurrentUser } from '../../../api/hooks/useInsightProject'
import { IInsightProject } from '../../../types'

export const useFilterInsightProjects = (): {
    onGoingProjects: IInsightProject[]
    futureProjects: IInsightProject[]
    completedProjects: IInsightProject[]
} => {
    const onGoingProjects: IInsightProject[] = []
    const futureProjects: IInsightProject[] = []
    const completedProjects: IInsightProject[] = []

    const { insightProjects, loading, error } = useInsightProjectByCurrentUser()

    if (insightProjects !== undefined) {
        for (const project of insightProjects) {
            if (
                isWithinInterval(new Date(), {
                    start: parse(project.start, 'yyyy-MM-dd', new Date()),
                    end: parse(project.end, 'yyyy-MM-dd', new Date()),
                })
            ) {
                onGoingProjects.push(project)
            } else if (isFuture(parse(project.start, 'yyyy-MM-dd', new Date()))) {
                futureProjects.push(project)
            } else {
                completedProjects.push(project)
            }
        }
    }

    return { onGoingProjects, futureProjects, completedProjects }
}
