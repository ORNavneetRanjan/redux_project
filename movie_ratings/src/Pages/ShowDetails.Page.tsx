import { FC, useEffect, useState } from "react";
import CastCard from "../Components/CastCard";
import GenrePill from "../Components/GenrePill";
import withRouter, { WithRouterProps } from "../hocs/withRouter";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { State } from "../store";
import { connect, ConnectedProps } from "react-redux";
import { castSelector, showsMapSelector } from "../selectors/Shows";
import { coverImage } from "../Components/ShowCard";
import LoadingSpinner from "../Components/LoadingSpinner";
import { Person, Show } from "../models/Show";
import { loadShowDetail, loadCastDetail } from "../api"; // Import the functions

type ownProps = WithRouterProps;

type ShowDetailPageProps = ReduxProps & ownProps;

const ShowDetailPage: FC<ShowDetailPageProps> = ({ params, show, cast }) => {
  const [Name, setName] = useState<Show>(show);
  const [Cast, setCast] = useState<Person[]>(cast);
  const showId = params.showId; // Destructure showId for clarity

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const showData = await loadShowDetail(+showId);
        setName(showData);
      } catch (error) {
        console.error("Error fetching show details:", error);
      }
    };

    const fetchCastDetails = async () => {
      try {
        const castData = await loadCastDetail(+showId);
        setCast(castData);
      } catch (error) {
        console.error("Error fetching cast details:", error);
      }
    };

    fetchShowDetails();
    fetchCastDetails();
  }, [showId]); // Effect depends on showId

  if (!Name) {
    return <LoadingSpinner />;
  }

  console.log("cast is ", Cast);
  let image_link = coverImage;
  if (Name.image) {
    image_link = Name.image.medium || Name.image.original || image_link;
  }

  const castElements = Cast.map(({ person }) => (
    <CastCard
      key={person.id}
      avatarLink={
        person.image ? person.image.medium || person.image.original : coverImage
      }
      name={person.name}
    />
  ));

  return (
    <>
      <span className="bg-gray-700 p-3 inline-block rounded-lg">
        <Link to="/" className="text-5xl text-blue-400">
          <IoChevronBackSharp />
        </Link>
      </span>

      <div className="mt-2">
        <h2 className="text-4xl font-semibold tracking-wide">{Name.name}</h2>
        <div className="flex space-x-3 my-2 bg-gray-300 p-2 rounded-sm">
          {Name.genres.map((title) => (
            <GenrePill key={title} name={title} />
          ))}
        </div>
        <div className="mt-2 flex">
          <img
            src={image_link}
            alt=""
            className="object-cover object-center w-full rounded-t-md h-full"
          />
          <div className="ml-2">
            <p
              dangerouslySetInnerHTML={{ __html: Name.summary || "" }}
              className="mt-2"
            ></p>
            <p className="mt-2 text-lg font-bold border border-gray-700 rounded-md px-2 py-1 max-w-max">
              Rating:{" "}
              <span className="text-gray-700">{Name.rating.average}/10</span>
            </p>
          </div>
        </div>

        <div className="mt-2">
          <h4 className="text-2xl font-semibold tracking-wide">Cast</h4>
          <div className="flex flex-wrap">{castElements}</div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: State, ownProps: ownProps) => {
  return {
    show: showsMapSelector(state)[+ownProps.params.showId],
    cast: castSelector(state),
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default withRouter(connector(ShowDetailPage));
