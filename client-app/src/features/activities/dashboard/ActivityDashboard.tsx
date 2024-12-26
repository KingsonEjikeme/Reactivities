import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

const ActivityDashboard = () => {
  const {
    activityStore: { activity, editMode },
  } = useStore();

  return (
    <Grid>
      <Grid.Column computer="10" mobile="16" tablet="12">
        <ActivityList />
      </Grid.Column>
      <Grid.Column computer="6" mobile="16" tablet="12">
        {activity?.id && !editMode && <ActivityDetails />}
        {editMode && (
          <ActivityForm />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
