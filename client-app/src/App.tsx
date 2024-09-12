import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Header, List } from 'semantic-ui-react';

export interface Activity {
  id: string;
  date: string;
  title: string;
  description: string;
  category: string;
  city: string;
  venue: string;
}

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(res => {
        setActivities(res.data);
      })
  }, [])

  return (
    <>
      <Header as={'h2'} icon={'users'} content='Reactivities' />
      <List>
        {
          activities.map((activity, index) => (
            <List.Item key={index}>
              <Header as={'h2'} content={activity.title} />
              <List>
                <List.Item><strong>ID: </strong>{activity.id}</List.Item>
                <List.Item><strong>Description: </strong>{activity.description}</List.Item>
                <List.Item><strong>Category: </strong>{activity.category}</List.Item>
                <List.Item><strong>City: </strong>{activity.city}</List.Item>
                <List.Item><strong>Venue: </strong>{activity.venue}</List.Item>
              </List>
            </List.Item>
          ))
        }
      </List>
    </>
  )
}

export default App
