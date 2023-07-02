// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import HomePage from './pages/HomePage';
import EventsPage, {loader as eventsLoader} from './pages/EventsPage';
import NewEventPage from './pages/NewEventPage';
import {action as NewEventAction} from './components/EventForm';
import EventDetailPage, {loader as eventLoader, action as deleteAction} from './pages/EventDetailPage';
import EditEventPage from './pages/EditEventPage';
import RootLayout from './pages/RootLayout';
import EventsLayout from './pages/EventsLayout';
import NewsletterPage, {action as newsletterAction} from './pages/Newsletter';
import ErrorPage from './components/ErrorPage';
function App() {

  const events = [
    {id: 'e1', tittle: 'Event 1', date: '01-Jan-2023', image: ''},
    {id: 'e2', tittle: 'Event 2', date: '02-Feb-2023', image: ''},
    {id: 'e3', tittle: 'Event 3', date: '31-Mar-2023', image:''},
    {id: 'e4', tittle: 'Event 4', date: '02-Apr-2023', image:''},
    {id: 'e5', tittle: 'Event 5', date: '15-May-2023', image: ''}
  ]
  const router = createBrowserRouter([{
    path:'/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, 
        element: <HomePage />
      },
      { 
        path: 'events', 
        element: <EventsLayout />, 
        children: [
          { 
            index: true, 
            element: <EventsPage events={events} />, 
            loader: eventsLoader
          },
          { path: ':eventId', 
            id: 'event-detail',
            loader: eventLoader,
            children: [
              {index: true, element: <EventDetailPage />, action: deleteAction },
              { path: 'edit', element: <EditEventPage />, action: NewEventAction}
            ]
          },
          { path: 'new', element: <NewEventPage />, action: NewEventAction}

        ]
      }, 
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ]
  }]);
  return <RouterProvider router={router}>
  </RouterProvider>;
}

export default App;
