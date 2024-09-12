import { FC, memo } from "react";
import { Person } from "../models/Show";
import { coverImage } from "./ShowCard";
type AllCastProps = {
  cast: Person;
};
const AllCast: FC<AllCastProps> = ({ cast }) => {
  return (
    <>
      <div className="w-10">
        <img
          className="rounded-full object-cover"
          src={
            cast.person.image
              ? cast.person.image.medium || cast.person.image.original
              : coverImage
          }
        />
      </div>
    </>
  );
};
export default memo(AllCast);
