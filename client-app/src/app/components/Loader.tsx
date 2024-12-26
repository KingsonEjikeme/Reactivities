import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
  content: string;
  inverted: boolean;
  loading: boolean;
}
const AppLoader = ({ loading, inverted, content }: Props) => {
  return (
    <Dimmer active={true}>
      <Loader active={loading} inverted={inverted} content={content} />
    </Dimmer>
  );
};

export default AppLoader;
