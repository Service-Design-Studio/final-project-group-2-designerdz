import { UserCardSelected, UserCardNotSelected } from "./UserCard";

export default function Carousel({ nameArr, onClickSelected, selectedIndex }) {
  return (
    <div className="grid grid-rows-1 grid-flow-col auto-cols-auto gap-x-4 overscroll-contain overflow-y-hidden mx-8 px-8 py-4">
      {nameArr.map((member, currentIndex) => {
        return currentIndex == selectedIndex ? (
          <UserCardSelected
            onClick={onClickSelected}
            name={member.full_name}
            index={currentIndex}
            key={currentIndex} //need find better alt for key
          />
        ) : (
          <UserCardNotSelected
            onClick={onClickSelected}
            name={member.full_name}
            index={currentIndex}
            key={currentIndex} //need find better alt for key
          />
        );
      })}
    </div>
  );
}
