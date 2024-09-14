import { Button, Item, Label, Loader } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import agent from "../../../app/api/agent";
import { useState } from "react";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    handleSelectActivity: () => void;
    reload: () => void;
}

const ActivityList = ({ activities, selectActivity, handleSelectActivity, reload }: Props) => {
    const [deletingId, setDeletingId] = useState<string | null>(null);

    function handleDelete(id: string) {
        setDeletingId(id);
        agent.Activities.delete(id).then(() => {
            reload();
        }).catch(err => {
            console.error(err);
        }).finally(() => setDeletingId(null));
    }

    return (
        <>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button
                                    floated="right"
                                    content="View"
                                    color="blue"
                                    onClick={() => {
                                        selectActivity(activity.id);
                                        handleSelectActivity();
                                    }}
                                />
                                <Button
                                    floated="right"
                                    content={deletingId === activity.id ? <Loader active inline size="tiny" /> : 'Delete'}
                                    color="red"
                                    onClick={() => handleDelete(activity.id)}
                                    disabled={deletingId === activity.id}
                                />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </>
    );
}

export default ActivityList;
