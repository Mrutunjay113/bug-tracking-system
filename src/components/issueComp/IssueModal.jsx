"use client";

//   //create a input field component to be used in the modal
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Link,
} from "@nextui-org/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { CalendarIcon, LockIcon, MailIcon } from "lucide-react";
import { Label } from "../ui/label";
import { ISSUE_TYPES, PRIORITYS } from "@/lib/data";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { DatePickerWithPresets } from "../DatePicker";
import { DatePickerDemo } from "../newDate";
import { updateIssue } from "@/lib/actions/issue/updateActions";
import { toast } from "sonner";

export default function IssueModal({ onOpenChange, isOpen, issue }) {
  const [formData, setFormData] = useState(issue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    //convert date to dd-mm-yyyy format
    // if (name === "dueDate") {
    //   const date = new Date(value);
    //   const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     [name]: formattedDate,
    //   }));
    //   return;

    if (Object.keys(formData).includes(name)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    const updatedData = {
      _id: formData._id,
      title: formData.title,
      description: formData.description,
      //convert date to dd-mm-yyyy format

      dueDate: formData.dueDate,
      priority: formData.priority,
      issueType: formData.issueType,
    };

    const updatedIssue = await updateIssue(updatedData);
    console.log("Updated Issue:", updatedIssue);
    if (updatedIssue.success) {
      toast.success("Issue updated successfully");
    } else {
      toast.error("Failed to update issue");
    }
    onOpenChange(false); // Close modal after saving
  };

  return (
    <>
      {/* <Button onPress={onOpen} color="primary">
        Open Modal
      </Button> */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {" "}
                Edit Issue
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="dueDate">Due Date</Label>{" "}
                  <Input
                    label="Due Date"
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                  />
                  {/* <DatePickerWithPresets handleDateChange={handleDateChange} /> */}
                </div>
                <div className="">
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="block w-full  px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {PRIORITYS.map((item) => (
                      <option
                        key={item.value}
                        value={item.value}
                        className="py-2 px-4 bg-white hover:bg-gray-100"
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="issueType">Issue Type</Label>
                  <select
                    name="issueType"
                    value={formData.issueType}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {ISSUE_TYPES.map((item) => (
                      <option
                        key={item.value}
                        value={item.value}
                        className="py-2 px-4 bg-white hover:bg-gray-100"
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="secondary"
                  onPress={onClose}
                  onClick={() => {
                    setFormData(issue);
                  }}
                >
                  Close
                </Button>
                <Button color="primary" onPress={handleSave}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
