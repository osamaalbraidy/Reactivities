import { Grid, Segment } from "semantic-ui-react"
import { Activity } from "../../../app/models/activity"
import ActivityList from "./ActivityList"
import ActivityDetails from "../details/ActivityDetails"
import ActivityForm from "../form/ActivityForm"

interface Props {
    activities: Activity[]
    selectedActivity: Activity | undefined
    selectActivity: (id: string) => void
    cancelSelectActivity: () => void
    selectedActivityEdit: Activity | undefined
    selectActivityEdit: (id: string) => void
    cancelSelectActivityEdit: () => void
    isCreateActivity: boolean
    cancelCreateActivity: () => void
    reload: () => void
}

const ActivityDashboard = (
    {
        activities,
        selectedActivity,
        selectActivity,
        cancelSelectActivity,
        selectedActivityEdit,
        selectActivityEdit,
        cancelSelectActivityEdit,
        isCreateActivity,
        cancelCreateActivity,
        reload
    }: Props) => {

    function handleSelectActivity() {
        cancelSelectActivityEdit();
        cancelCreateActivity();
    }

    return (
        <Grid>
            <Grid.Column width={'10'}>
                <Segment>
                    <ActivityList
                        reload={reload}
                        activities={activities}
                        selectActivity={selectActivity}
                        handleSelectActivity={handleSelectActivity}
                    />
                </Segment>
            </Grid.Column>
            <Grid.Column width={6}>
                {!isCreateActivity ? (<>
                    {selectedActivityEdit ? (
                        <ActivityForm
                            activity={selectedActivityEdit}
                            cancelSelectActivityEdit={cancelSelectActivityEdit}
                            isCreateActivity={false}
                            cancelCreateActivity={() => { }}
                            reload={reload}
                            cancelSelectActivity={cancelSelectActivity}
                        />
                    ) : (<ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        selectActivityEdit={selectActivityEdit}
                    />)}
                </>) : (
                    <ActivityForm
                        cancelSelectActivity={cancelSelectActivity}
                        activity={undefined}
                        cancelSelectActivityEdit={() => { }}
                        isCreateActivity={true}
                        cancelCreateActivity={cancelCreateActivity}
                        reload={reload}
                    />
                )
                }
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard
