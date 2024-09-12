import { FC, useEffect, useState } from "react";
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
import { searchShows } from "../api";
import { Person, Show } from "../models/Show";

type ShowCart = {
  show: Show;
  cast: Person[];
};

type ShowListProps = ReduxProps;

const ShowListPage: FC<ShowListProps> = ({
  query,
  shows,
  showsQueryChange,
  loading,
}) => {
  const [showCastList, setShowCart] = useState<
    { show: Show; cast: Person[] }[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await searchShows(query); // Wait for the promise to resolve
        setShowCart(data);
        console.log("This is the show list page data: ", data); // Log the actual data
      } catch (error) {
        console.error("Error fetching show list: ", error); // Handle any errors
      }
    };

    if (query) {
      fetchData(); // Call the async function when the query changes
    }
  }, [query]);

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
        {showCastList.map((s) => (
          <ShowCard key={s.show.id} show={s.show} cast={s.cast} />
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
