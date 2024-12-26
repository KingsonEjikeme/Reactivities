import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

const ActivityForm = () => {
  const {
    activityStore: {
      activity: selectedActivity,
      closeForm,
      editActivity,
      createActivity,
      loading,
    },
  } = useStore();

  const initialState = selectedActivity ?? {
    id: "",
    category: "",
    city: "",
    date: "",
    description: "",
    title: "",
    venue: "",
  };
  
  const [activity, setActivity] = useState(initialState);

  const handleSubmit = async(e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activity.id) {
      await editActivity(activity);
    } else {
      await createActivity(activity);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setActivity({ ...activity, [event.target.name]: event.target.value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="on">
        <Form.Input
          placeholder="Title"
          name="title"
          value={activity["title"]}
          onChange={handleChange}
        />
        <Form.TextArea
          placeholder="Description"
          name="description"
          value={activity["description"] as string}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Category"
          name="category"
          value={activity["category"]}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Date"
          name="date"
          type="datetime-local"
          value={activity["date"]?.slice(0, 16)}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="City"
          name="city"
          value={activity["city"]}
          onChange={handleChange}
        />
        <Form.Input
          placeholder="Venue"
          name="venue"
          value={activity["venue"]}
          onChange={handleChange}
        />
        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
          loading={loading}
        />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={closeForm}
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
