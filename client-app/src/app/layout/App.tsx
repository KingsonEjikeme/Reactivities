import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../layout/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import AppLoader from "../components/Loader";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, []);

  if (activityStore.loadingInitial) {
    return (
      <AppLoader
        loading={activityStore.loadingInitial}
        inverted={false}
        content="Loading App..."
      />
    );
  }

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
