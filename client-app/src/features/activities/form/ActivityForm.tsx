import { useState, ChangeEvent } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import agent from '../../../app/api/agent';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';

interface Props {
    activity: Activity | undefined;
    cancelSelectActivityEdit: () => void;
    isCreateActivity: boolean;
    cancelCreateActivity: () => void;
    reload: () => void
    cancelSelectActivity: () => void
}

const ActivityForm = ({ activity, cancelSelectActivityEdit, isCreateActivity, cancelCreateActivity, reload, cancelSelectActivity }: Props) => {
    const [form, setForm] = useState({
        title: activity?.title || '',
        description: activity?.description || '',
        category: activity?.category || '',
        date: activity?.date || '',
        city: activity?.city || '',
        venue: activity?.venue || ''
    });
    const [loading, setLoading] = useState<boolean>(false)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    function handleSubmit() {
        setLoading(true)
        const activityData = {
            title: form.title,
            description: form.description,
            category: form.category,
            date: form.date,
            city: form.city,
            venue: form.venue
        };

        if (isCreateActivity) {
            agent.Activities.create(activityData).then(res => {
                console.log(res);
                cancelCreateActivity()
                cancelSelectActivity()
                reload()
            })
                .catch(err => {
                    console.error(err);
                }).finally(() => setLoading(false))
        } else {
            agent.Activities.update(activityData, activity ? activity.id : '').then(res => {
                console.log(res);
                cancelSelectActivityEdit()
                cancelSelectActivity()
                reload()
            })
                .catch(err => {
                    console.error(err);
                }).finally(() => setLoading(false))
        }
    }

    return (
        <>
            {(activity || isCreateActivity) && (
                <Segment clearing>
                    {loading && (<div style={{ height: 200 }}>
                        {isCreateActivity && (<LoadingComponent content='creating activity' />)}
                        {!isCreateActivity && (<LoadingComponent content='updating activity' />)}
                    </div>)}
                    {!loading && (<>
                        <Header content={activity ? 'Edit Activity' : 'Create Activity'} />
                        <Form>
                            <Form.Input
                                placeholder='Title'
                                value={form.title}
                                name='title'
                                onChange={handleInputChange}
                            />
                            <Form.TextArea
                                placeholder='Description'
                                value={form.description}
                                name='description'
                                onChange={handleInputChange}
                            />
                            <Form.Input
                                placeholder='Category'
                                value={form.category}
                                name='category'
                                onChange={handleInputChange}
                            />
                            <Form.Input
                                placeholder='Date'
                                value={form.date}
                                name='date'
                                onChange={handleInputChange}
                                type='date'
                            />
                            <Form.Input
                                placeholder='City'
                                value={form.city}
                                name='city'
                                onChange={handleInputChange}
                            />
                            <Form.Input
                                placeholder='Venue'
                                value={form.venue}
                                name='venue'
                                onChange={handleInputChange}
                            />
                            <Button
                                floated='right'
                                positive
                                type='submit'
                                content='Submit'
                                onClick={handleSubmit}
                            />
                            <Button
                                floated='right'
                                type='button'
                                content='Cancel'
                                onClick={isCreateActivity ? cancelCreateActivity : cancelSelectActivityEdit}
                            />
                        </Form></>)}
                </Segment>
            )}
        </>
    );
};

export default ActivityForm;
