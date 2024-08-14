"use client";
import React, { useEffect, useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  setMonth,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { getIssueByDate } from "@/lib/actions/dashboard/calenderIssues";

const CustomCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const today = new Date();
  const months = [
    { name: "January", value: 0 },
    { name: "February", value: 1 },
    { name: "March", value: 2 },
    { name: "April", value: 3 },
    { name: "May", value: 4 },
    { name: "June", value: 5 },
    { name: "July", value: 6 },
    { name: "August", value: 7 },
    { name: "September", value: 8 },
    { name: "October", value: 9 },
    { name: "November", value: 10 },
    { name: "December", value: 11 },
  ];

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleMonthChange = (value) => {
    const monthIndex = parseInt(value);
    setCurrentMonth(setMonth(currentMonth, monthIndex));
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
    const selectedDay = format(day, "yyyy-MM-dd");
    const issue = data.find((item) => item.dueDate === selectedDay);
    console.log("issue", issue);
    if (issue) {
      setSelectedIssue(issue);
      setPopoverOpen(true);
    }
  };

  const renderHeader = () => (
    <div className="flex justify-between gap-2 items-center mb-4">
      <button
        onClick={prevMonth}
        className="p-1 border rounded-md text-muted-foreground text-sm hover:bg-gray-100 hover:text-gray-800"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <div className="flex items-center">
        <Select onValueChange={handleMonthChange}>
          <SelectTrigger className="w-[100px] min-w-full">
            <SelectValue placeholder={months[currentMonth.getMonth()].name} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Months</SelectLabel>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value.toString()}>
                  {month.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <span className="text-base font-medium ml-2">
          {format(currentMonth, "yyyy")}
        </span>
      </div>
      <button
        onClick={nextMonth}
        className="p-1 border rounded-md text-muted-foreground hover:bg-gray-100 hover:text-gray-800"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    let startDate = startOfWeek(startOfMonth(currentMonth));
    let endDate = endOfWeek(endOfMonth(currentMonth));

    while (startDate <= endDate) {
      const day = new Date(startDate);
      const isToday = isSameDay(day, today);
      const isSelected = isSameDay(day, selectedDate);
      const highlight = data.find((highlightedDate) =>
        isSameDay(day, parseISO(highlightedDate.dueDate))
      );

      const dayStyle = isSelected
        ? //if highlight is true then it will show the image of the user
          `${highlight ? " text-white " : "bg-gray-400 text-white"}`
        : isToday
        ? "bg-gray-200 text-gray-800"
        : isSameMonth(day, currentMonth)
        ? "hover:bg-blue-200"
        : "text-gray-300";

      const customStyle = highlight
        ? highlight.imageurl
          ? // "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png"
            "bg-cover bg-center bg-no-repeat"
          : "bg-orange-400 text-white"
        : "";

      days.push(
        <Popover
          key={day.toString()}
          isOpen={popoverOpen && isSelected}
          onClose={() => setPopoverOpen(false)}
        >
          <PopoverTrigger>
            <div
              className={`flex justify-center items-center h-10 w-10 rounded cursor-pointer ${dayStyle} ${customStyle}`}
              onClick={() => onDateClick(day)}
              style={{
                backgroundImage: highlight?.imageurl
                  ? // ? `url(${highlight.image})`
                    `url(https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png)`
                  : "none",
              }}
            >
              {format(day, "d")}
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-4 grid gap-2 w-fit bg-white rounded-md z-40 shadow-xl border max-w-[300px] items-start border-gray-200">
            <h2 className="text-lg uppercase tracking-wide font-bold flex text-wrap">
              {selectedIssue?.title}
            </h2>
            <div className="text-sm text-gray-600 ">
              <span className="font-medium uppercase text-gray-700">
                Status:
              </span>{" "}
              {selectedIssue?.status}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-700">Due Date:</span>{" "}
              <span className="text-red-500 text-muted-foreground font-medium">
                {new Date(selectedIssue?.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="text-sm text-gray-600 ">
              <span className="font-medium text-gray-700">Type:</span>{" "}
              {selectedIssue?.type}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-700">Priority:</span>{" "}
              {selectedIssue?.priority}
            </div>
            {/* //team name from temLeader array */}
            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-700">Team:</span>{" "}
              {selectedIssue?.team?.teamLeader?.firstName}{" "}
              {selectedIssue?.team?.teamLeader?.lastName}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-700">Members:</span>{" "}
              {selectedIssue?.team?.members.map((member) => (
                <span key={member._id}>
                  {member.firstName} {member.lastName}
                </span>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      );
      startDate = addDays(startDate, 1);
    }

    return <div className="grid grid-cols-7 md:gap-2">{days}</div>;
  };

  useEffect(() => {
    async function fetchData() {
      const result = await getIssueByDate();
      setData(result.data);
      console.log("result", result);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Close popover when clicking outside of it
    const handleClickOutside = (e) => {
      if (!e.target.closest(".nextui-popover-content")) {
        setPopoverOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg relative border mx-auto">
      {renderHeader()}
      <div className="grid grid-cols-7 gap-2 text-center text-muted-foreground font-medium mb-2">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>
      {renderDays()}
    </div>
  );
};

export default CustomCalendar;
