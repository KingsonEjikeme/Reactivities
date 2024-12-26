import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuid } from "uuid";
import { IReactivities } from "../../lib";
import agent from "../api/agent";

export default class ActivityStore {
  activities: IReactivities["schemas"]["Activity"][] = [];
  activityRegistry = new Map<string, IReactivities["schemas"]["Activity"]>();
  activity: IReactivities["schemas"]["Activity"] | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date!) - Date.parse(b.date!)
    );
  }

  //   setSelectedActivity = (
  //     activity: IReactivities["schemas"]["Activity"] | undefined
  //   ) => {
  //     this.activity = activity;
  //   };

  setEditMode = (e: boolean) => {
    this.editMode = e;
  };

  selectActivity = (id: string) => {
    this.activity = this.activityRegistry.get(id);
  };

  cancelSelectedActivity = () => {
    this.activity = undefined;
  };

  openForm = (id?: string) => {
    // id ? this.selectActivity(id) : this.cancelSelectedActivity();
    if (id) {
      this.selectActivity(id);
    } else {
      this.cancelSelectedActivity();
    }
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createActivity = async (activity: ActivityStore["activity"]) => {
    if (!activity) return;

    this.loading = true;

    activity.id = uuid();
    await agent.Activities.create({ ...activity })
      .then(() => {
        this.activityRegistry.set(activity.id!, activity);
        this.activity = activity;
        this.editMode = false;
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  };

  editActivity = async (activity: ActivityStore["activity"]) => {
    if (!activity) return;
    this.loading = true;
    await agent.Activities.update(activity!)
      .then(() => {
        this.activityRegistry.set(activity.id!, activity);
        this.activity = activity;
        this.editMode = false;
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    await agent.Activities.delete(id)
      .then(() => {
        if (id === this.activity?.id) {
          runInAction(() => {
            this.activity = undefined;
          });
        }
        this.activityRegistry.delete(id);
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  };

  loadActivities = async () => {
    await agent.Activities.list()
      .then((response: IReactivities["schemas"]["Activity"][]) => {
        runInAction(() => {
          const activities = response;
          activities.forEach((activity) => {
            this.activityRegistry.set(activity.id!, activity);
          });
          this.activities = response;
          this.loadingInitial = false;
        });
      })
      .catch((err: object) => {
        runInAction(() => {
          console.log(err);
          this.loadingInitial = false;
        });
      });
  };
}
