import { useDispatch, useSelector } from "react-redux";
import { API_Call } from "../../../redux/middlewares/api";
import { requestAnswered, requestSent } from "../../../redux/reducers/request";
import { get_tags, get_tags_status, newTag } from "../../../redux/reducers/tag";
import AppAutoComplete from "../AppAutoComplete";

function TagSelector({ state, topic }) {
  const [tag, setTag] = state;
  const tags = useSelector(get_tags(topic));
  const loadingTags = useSelector(get_tags_status);
  const dispatch = useDispatch();

  const handleAdd = (name) =>
    dispatch(
      API_Call({
        url: "tag",
        method: "post",
        data: { name, topic },
        beforeAll: requestSent,
        onSuccess: newTag,
        afterAll: requestAnswered,
      })
    );
  return (
    <AppAutoComplete
      disabled={loadingTags || !topic ? true : false}
      value={tag}
      setValue={setTag}
      collection={tags.map((t) => t.name)}
      id="tag"
      label={!loadingTags ? (!topic ? "Topic first" : "Tags") : "Loading tags"}
      handleSubmit={handleAdd}
    />
  );
}

export default TagSelector;
