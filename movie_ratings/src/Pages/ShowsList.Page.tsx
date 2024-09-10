import { FC } from "react";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { showsQueryChangeAction } from "../actions/Shows";
import { connect, ConnectedProps } from "react-redux";
import { State } from "../store";
import { showsQuerySelector, showsSelector } from "../selectors/Shows";

type ShowListProps = ReduxProps;

const ShowListPage: FC<ShowListProps> = ({
  query,
  shows,
  showsQueryChange,
}) => {
  return (
    <div className="mt-2">
      <SearchBar
        value={query}
        onChange={(event) => {
          showsQueryChange(event.target.value);
        }}
      />
      <div className="flex flex-wrap justify-center">
        {shows.map((s) => (
          <ShowCard key={s.id} show={s} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return { query: showsQuerySelector(state), shows: showsSelector(state) };
};

const mapDispatchToProps = {
  showsQueryChange: showsQueryChangeAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ShowListPage);
