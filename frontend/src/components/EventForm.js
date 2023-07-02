import { Form, redirect, useNavigate, json, useNavigation } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event.title ? event.title :''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event.image ? event.image :''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event.date ? event.date :''} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event.description ? event.description :''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button>{navigation.state === 'submitting' ?'Submitting' : 'Save'}</button>
      </div>
    </Form>
  );
}
export default EventForm;

export const action = async ({request, params}) => {
 const data = await request.formData();
 const eventData= {
  title: data.get('title'), 
  image: data.get('image'), 
  date: data.get('date'), 
  description:data.get('description')
};
const URL = 'http://localhost:8080/events' + (request.method === 'PATCH' ? '/'+params.eventId: '');
 const response = await fetch(URL, {
  method: request.method,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(eventData),
});
 if (!response.ok) {
  throw json({ message: 'Could not save event.' }, { status: 500 });
}
const redirectURL = '/events' + (request.method === 'PATCH' ? '/'+params.eventId: '');
 return redirect(redirectURL);
};
