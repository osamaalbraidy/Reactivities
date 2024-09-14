import { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';

export default function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [selectedActivityEdit, setSelectedActivityEdit] = useState<Activity | undefined>(undefined);
  const [isCreateActivity, setIsCreateActivity] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchData()
  }, [])

  function fetchData() {
    setLoading(true)
    agent.Activities.list().then(response => {
      response.map(activity => activity.date = activity.date.substring(0, 10))
      setActivities(response);
      setLoading(false)
    })
  }

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id))
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined)
  }

  function handleSelectActivityEdit(id: string) {
    setSelectedActivityEdit(activities.find(x => x.id === id))
  }

  function handleCancelSelectActivityEdit() {
    setSelectedActivityEdit(undefined)
  }

  function reload() {
    fetchData()
  }

  if (loading) return <LoadingComponent content='Loading App' />

  return (
    <>
      <Navbar createActivity={() => setIsCreateActivity(true)} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          reload={reload}
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivityEdit={selectedActivityEdit}
          selectActivityEdit={handleSelectActivityEdit}
          cancelSelectActivityEdit={handleCancelSelectActivityEdit}
          isCreateActivity={isCreateActivity}
          cancelCreateActivity={() => setIsCreateActivity(false)}
        />
      </Container>
    </>
  )
}
