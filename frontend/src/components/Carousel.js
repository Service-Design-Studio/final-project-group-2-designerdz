import { UserCardSelected, UserCardNotSelected } from "./UserCard";

export default function Carousel(nameArr, onClick) {
  return (
    <div className="grid grid-rows-1 grid-flow-col auto-cols-auto gap-x-4 overscroll-contain overflow-y-hidden mx-8 p-8">
      <UserCardSelected onClick={onClick} name="Mah Yi Da " />
      <UserCardNotSelected name="sally" />
      <UserCardNotSelected name="sally" />
      <UserCardNotSelected name="sally" />
    </div>
  );
}

let nameArray = [{ name: "test1" }, { name: "test2" }, { name: "test3" }];
