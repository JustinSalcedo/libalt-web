import {observer} from 'mobx-react-lite'
import IssueItem from './IssueItem'
import useIssueListObservable from '../hooks/useIssueListObservable'

// IssueList component
const IssueList = observer(() => {
    const issueListObservable = useIssueListObservable()

    return (
        <div className="issue-list">
            {issueListObservable.activeIssues.map(issue => (
                <IssueItem
                    key={issue.id}
                    issue={issue}
                    small={issueListObservable.activeIssues.length > 5}
                />
            ))}
            {/* collapsible archived issues list */}
            {issueListObservable.archivedIssues.length > 0 && (
                <details>
                    <summary>Archived Issues</summary>
                    {issueListObservable.archivedIssues.map(issue => (
                        <IssueItem key={issue.id} issue={issue} small={true} />
                    ))}
                </details>
            )}
        </div>
    )
})

export default IssueList
