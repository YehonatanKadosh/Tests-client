import { useDispatch, useSelector } from "react-redux";
import { API_Call } from "../../redux/middlewares/api";
import { requestAnswered, requestSent } from "../../redux/reducers/request";
import {
  get_topics,
  get_topics_status,
  newTopic,
} from "../../redux/reducers/topic";
import AppAutoComplete from "../AppAutoComplete";

function TopicSelector({ state }) {
  const [topic, setTopic] = state;
  const topics = useSelector(get_topics);
  const loadingTopics = useSelector(get_topics_status);
  const dispatch = useDispatch();

  const handleAdd = (name) =>
    dispatch(
      API_Call({
        url: "topic",
        method: "post",
        data: { name },
        beforeAll: requestSent,
        onSuccess: newTopic,
        afterAll: requestAnswered,
      })
    );

  return (
    <AppAutoComplete
      disabled={loadingTopics}
      value={topic}
      setValue={setTopic}
      collection={topics.map((t) => t.name)}
      id="topic"
      label={!loadingTopics ? "Topics" : "Loading topics"}
      handleSubmit={handleAdd}
    />
  );
}

export default TopicSelector;
