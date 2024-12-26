import { Button, Item, Label, Segment } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

const ActivityList = () => {
  const [target, setTarget] = useState("");
  const {
    activityStore: { activitiesByDate, selectActivity, deleteActivity, loading },
  } = useStore();

  const viewDetails = (id: string) => {
    selectActivity(id)
  };

  const handleActivityDelete = async(e: SyntheticEvent<HTMLButtonElement>) => {
    setTarget(e.currentTarget.name);
    deleteActivity(e.currentTarget.name);
  };

  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map((activity, index) => (
          <Item key={index}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => viewDetails(activity.id as string)}
                />
                <Button
                  name={activity.id}
                  floated="right"
                  content="Delete"
                  color="red"
                  loading={loading && target === activity.id}
                  // disabled={submitting}
                  onClick={handleActivityDelete}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
