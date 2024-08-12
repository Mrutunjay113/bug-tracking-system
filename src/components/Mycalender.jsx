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
import { getIssueByDate } from "@/lib/actions/dashboard/calenderIssues";
import IssueDetailModal from "./HomeComp/CalenderModal";

const CustomCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
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

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
    const selectedDay = format(day, "yyyy-MM-dd");
    const issue = data.find((item) => item.dueDate === selectedDay);
    if (issue) {
      setSelectedIssue(issue);
      setModalOpen(true);
    }
  };

  const handleMonthChange = (value) => {
    const monthIndex = parseInt(value);
    setCurrentMonth(setMonth(currentMonth, monthIndex));
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="p-1 border rounded-md text-muted-foreground"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center">
          <Select onValueChange={handleMonthChange}>
            <SelectTrigger className="w-[150px]">
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
          <span className="text-lg font-semibold ml-2">
            {format(currentMonth, "yyyy")}
          </span>
        </div>
        <button
          onClick={nextMonth}
          className="p-1 border rounded-md text-muted-foreground"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    let startDate = startOfWeek(startOfMonth(currentMonth));
    let endDate = endOfWeek(endOfMonth(currentMonth));

    while (startDate <= endDate) {
      const day = new Date(startDate);
      const isToday = isSameDay(day, today);
      const isSelected = isSameDay(day, selectedDate);
      const highlight = data?.find((highlightedDate) =>
        isSameDay(day, parseISO(highlightedDate.dueDate))
      );

      const dayStyle = isSelected
        ? "bg-green-500 text-white"
        : isToday
        ? "bg-gray-500 text-white"
        : isSameMonth(day, currentMonth)
        ? "hover:bg-blue-200"
        : "text-gray-400";

      const customStyle = highlight
        ? highlight.imageUrl
          ? "bg-cover bg-center bg-no-repeat"
          : "bg-blue-500 text-white"
        : "";

      days.push(
        <div
          className={`flex justify-center items-center h-10 w-10 rounded cursor-pointer ${dayStyle} ${customStyle}`}
          key={day.toString()}
          onClick={() => onDateClick(day)}
          style={{
            backgroundImage: highlight?.imageUrl
              ? `url(${highlight.imageUrl})`
              : "none",
          }}
        >
          {format(day, "d")}
        </div>
      );
      startDate = addDays(startDate, 1);
    }

    return <div className="grid grid-cols-7 gap-2">{days}</div>;
  };

  useEffect(() => {
    async function fetchData() {
      const result = await getIssueByDate();
      setData(result.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    //close modal when click out side of modal then close modal
    const closeModal = (e) => {
      if (e.target.id === "modal") {
        setModalOpen(false);
      }
    };
    window.addEventListener("click", closeModal);
    return () => {
      window.removeEventListener("click", closeModal);
    };
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg relative shadow-lg max-w-sm mx-auto">
      {renderHeader()}
      <div className="grid grid-cols-7 gap-2 text-center text-gray-600 font-medium mb-2">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>
      {renderDays()}
      <IssueDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        issue={selectedIssue}
      />
    </div>
  );
};

export default CustomCalendar;
