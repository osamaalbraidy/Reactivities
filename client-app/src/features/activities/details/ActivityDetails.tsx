import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Image,
    Button,
} from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
    activity: Activity | undefined
    cancelSelectActivity: () => void
    selectActivityEdit: (id: string) => void
}

const ActivityDetails = ({ activity, cancelSelectActivity, selectActivityEdit }: Props) => {
    return (
        <>
            {activity && (
                <Card fluid>
                    <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
                    <CardContent>
                        <CardHeader>{activity.title}</CardHeader>
                        <CardMeta>
                            <span className='date'>{activity.date}</span>
                        </CardMeta>
                        <CardDescription>
                            {activity.description}
                        </CardDescription>
                    </CardContent>
                    <CardContent extra>
                        <Button.Group widths={'2'}>
                            <Button basic color='blue' content='Edit' onClick={() => {
                                selectActivityEdit(activity.id)
                            }} />
                            <Button basic color='grey' content='Cancel' onClick={() => cancelSelectActivity()} />
                        </Button.Group>
                    </CardContent>
                </Card>
            )}
        </>
    )
}

export default ActivityDetails
