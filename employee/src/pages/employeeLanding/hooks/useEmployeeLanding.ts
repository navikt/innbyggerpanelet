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

    try {
        if (insightProjects && insightProjects.length > 0) {
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
    } catch (error) {
        // TODO: Have to use this to suppress weird RangeError only found in build files
    }

    return { onGoingProjects, futureProjects, completedProjects }
}
