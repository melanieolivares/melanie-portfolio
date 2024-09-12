const holidayData = [
  {
    name: "Halloween",
    date: new Date("2004-10-31"),
    image1: "/src/assets/1295590.svg",
    image2: "/src/assets/1777668.svg",
  },
  {
    name: "Christmas",
    date: new Date("2004-12-25"),
    image1: null,
    image2: null,
  },
  {
    name: "Birthday",
    date: new Date("2004-06-03"),
    image1: null,
    image2: null,
  },
];

const today = new Date();

function isWithinSevenDaysBeforeSameDayMonth(date1, date2) {
  const day1 = date1.getDate();
  const month1 = date1.getMonth();
  const day2 = date2.getDate();
  const month2 = date2.getMonth();

  const timeDifference = Math.abs(day2 - day1 + (month2 - month1) * 30);

  return timeDifference <= 7;
}

export const Holidays = () => {
  return (
    <>
      {isWithinSevenDaysBeforeSameDayMonth(holidayData[0].date, today) && (
        <>
          <img
            src={holidayData[0].image1}
            alt="cobweb"
            className="absolute -bottom-48 -left-48 w-3/12"
          />
          <img
            src={holidayData[0].image2}
            alt="cobweb with spider"
            className="absolute  w-2/12 right-0"
          />
        </>
      )}
    </>
  );
};
