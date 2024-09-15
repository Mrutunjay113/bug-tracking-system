import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { DeleteIcon, Edit, EditIcon, Eye, EyeIcon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

const statusColorMap = {
  Available: "success",
  Busy: "secondary",
  Vacation: "warning",
  OnLeave: "danger",
};

const MembersTeamTable = ({ members, onEdit, onDelete }) => {
  const router = useRouter();

  console.log("members", members);
  const renderCell = React.useCallback(
    (member, columnKey) => {
      const cellValue = member[columnKey];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{
                radius: "full",
                //  src: member.profileImg
                src: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
              }}
              description={member.email}
              name={`${member.firstName} ${member.lastName}`}
            >
              {member.email}
            </User>
          );
        case "role":
          return <p className="text-sm capitalize">{member.designation}</p>;

        case "tasks":
          return <p className="text-sm">{member.tasks.length}</p>;
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[member.availabilityStatus]}
              size="sm"
              variant="flat"
            >
              {member.availabilityStatus}
            </Chip>
          );
        case "actions":
          return (
            <div className="flex justify-center gap-2 ">
              <Tooltip content="Details">
                <span
                  className="text-lg text-default-400 cursor-pointer"
                  onClick={() =>
                    router.push(`/dashboard/members/${member._id}`)
                  }
                >
                  <Eye size={20} />
                </span>
              </Tooltip>
              {/* <Tooltip content="Edit user">
                <span
                  className="text-lg text-default-400 cursor-pointer"
                  onClick={() => onEdit(member)}
                >
                  <Edit />
                </span>
              </Tooltip> */}
              <Tooltip color="danger" content="Delete user">
                <span
                  className="text-lg text-danger cursor-pointer"
                  onClick={() => onDelete(member)}
                >
                  <Trash size={20} />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [onEdit, onDelete]
  );

  return (
    <Table aria-label="Members table">
      <TableHeader
        columns={[
          { name: "Name", uid: "name" },
          { name: "Tasks", uid: "tasks" },
          { name: "Role", uid: "role" },
          { name: "Status", uid: "status" },
          { name: "Actions", uid: "actions" },
        ]}
      >
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={members}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MembersTeamTable;
