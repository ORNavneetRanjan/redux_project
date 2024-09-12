import { FC } from "react";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { showsQueryChangeAction } from "../actions/Shows";
import { connect, ConnectedProps } from "react-redux";
import { State } from "../store";
import {
  showsLoadingSelector,
  showsQuerySelector,
  showsSelector,
} from "../selectors/Shows";
import LoadingSpinner from "../Components/LoadingSpinner";

type ShowListProps = ReduxProps;

const ShowListPage: FC<ShowListProps> = ({
  query,
  shows,
  showsQueryChange,
  loading,
}) => {
  return (
    <div className="mt-2">
      <div className="flex flex-col gap-2">
        <SearchBar
          value={query}
          onChange={(event) => {
            showsQueryChange(event.target.value);
          }}
        />
        {loading && <LoadingSpinner />}
      </div>
      <div className="flex flex-wrap justify-center">
        {shows.map((s) => (
          <ShowCard key={s.id} show={s} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    query: showsQuerySelector(state),
    shows: showsSelector(state),
    loading: showsLoadingSelector(state),
  };
};

const mapDispatchToProps = {
  showsQueryChange: showsQueryChangeAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ShowListPage);
