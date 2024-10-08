import { FC } from "react";
import { Link } from "react-router-dom";
import { Person, Show } from "../models/Show";
import AllCast from "./AllCast";

type showCardProps = {
  show: Show;
  cast: Person[];
};
export const coverImage =
  "https://images.pexels.com/photos/1323206/pexels-photo-1323206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const ShowCard: FC<showCardProps> = ({ show, cast }) => {
  return (
    <div className="max-w-xs rounded-md shadow-md p-2 m-1">
      <img
        src={
          show.image
            ? show.image.medium
              ? show.image.medium
              : show.image.original
            : coverImage
        }
        alt=""
        className="object-cover object-center w-full rounded-t-md h-72"
      />
      <div className="w-full flex justify-center p-10 gap-1">
        {cast.map((person) => (
          <AllCast key={JSON.stringify(person)} cast={person} />
        ))}
      </div>
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-wide">{show.name}</h2>
          <p>{show.summary}</p>
        </div>
        <Link
          to={"/show/" + show.id}
          className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ShowCard;
