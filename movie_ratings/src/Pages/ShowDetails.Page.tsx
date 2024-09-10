import { FC, useEffect } from "react";
import CastCard from "../Components/CastCard";
import GenrePill from "../Components/GenrePill";
import withRouter, { WithRouterProps } from "../hocs/withRouter";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { State } from "../store";
import { connect, ConnectedProps } from "react-redux";
import { showsMapSelector } from "../selectors/Shows";
import { coverImage } from "../Components/ShowCard";
import { loadShowAction } from "../actions/Shows";
import LoadingSpinner from "../Components/LoadingSpinner";

type ownProps = WithRouterProps;

type ShowDetailPageProps = ReduxProps & ownProps;

const ShowDetailPage: FC<ShowDetailPageProps> = ({
  params,
  show,
  loadShow,
}) => {
  console.log("showDetails id: ", params.showId);
  useEffect(() => {
    loadShow(+params.showId);
  }, [params.showId]);
  console.log("showDetails ", show);
  if (!show) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <span className="bg-gray-700 p-3 inline-block rounded-lg">
        <Link to="/" className="text-5xl text-blue-400">
          <IoChevronBackSharp />
        </Link>
      </span>

      <div className="mt-2">
        <h2 className="text-4xl font-semibold tracking-wide">{show.name}</h2>
        <div className="flex space-x-3 my-2 bg-gray-300 p-2 rounded-sm">
          {show.genres.map((title) => (
            <GenrePill key={title} name={title} />
          ))}
        </div>
        <div className="mt-2 flex">
          <img
            src={show.image.medium || show.image.original || coverImage}
            alt=""
            className="object-cover object-center w-full rounded-t-md h-72"
          />
          <div className="ml-2">
            <p
              dangerouslySetInnerHTML={{ __html: show.summary || "" }}
              className="mt-2"
            ></p>
            <p className="mt-2 text-lg font-bold border border-gray-700 rounded-md px-2 py-1 max-w-max">
              Rating:{" "}
              <span className="text-gray-700">{show.rating.average}/10</span>
            </p>
          </div>
        </div>

        <div className="mt-2">
          <h4 className="text-2xl font-semibold tracking-wide">Cast</h4>
          <div className="flex flex-wrap">
            <CastCard
              avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545468.jpg"
              name="Henry Cavill"
            />
            <CastCard
              avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545472.jpg"
              name="Freya Allan"
            />
            <CastCard
              avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545470.jpg"
              name="Anya Chalotra"
            />
            <CastCard
              avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/232/581040.jpg"
              name="Mimi Ndiweni"
            />
            <CastCard
              avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545468.jpg"
              name="Henry Cavill"
            />
            <CastCard
              avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545472.jpg"
              name="Freya Allan"
            />
            <CastCard
              avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545470.jpg"
              name="Anya Chalotra"
            />
            <CastCard
              avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/232/581040.jpg"
              name="Mimi Ndiweni"
            />
            <CastCard
              avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545468.jpg"
              name="Henry Cavill"
            />
            <CastCard
              avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545472.jpg"
              name="Freya Allan"
            />
            <CastCard
              avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545470.jpg"
              name="Anya Chalotra"
            />
            <CastCard
              avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/232/581040.jpg"
              name="Mimi Ndiweni"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: State, ownProps: ownProps) => {
  return { show: showsMapSelector(state)[+ownProps.params.showId] };
};

const mapDispatchToProps = {
  loadShow: loadShowAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default withRouter(connector(ShowDetailPage));
