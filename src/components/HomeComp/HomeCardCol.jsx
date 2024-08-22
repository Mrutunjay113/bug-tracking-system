import HomeCard from "./HomeCard";

const HomeCardCol = ({ data }) => {
  console.log(`card`, data);

  return (
    <div className="">
      <HomeCard data={data} />
    </div>
  );
};

export default HomeCardCol;
