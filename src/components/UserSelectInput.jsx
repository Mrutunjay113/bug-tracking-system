import React from "react";
import PropTypes from "prop-types";
import { Select, SelectItem, Avatar } from "@nextui-org/react";

const UserSelect = ({
  label,
  selectionMode = "multiple",
  placeholder,
  selectedKeys,
  onSelectionChange,
  data,
}) => {
  return (
    <Select
      items={data}
      label={label}
      selectionMode={selectionMode}
      selectedKeys={selectedKeys}
      placeholder={placeholder}
      onSelectionChange={onSelectionChange}
      className="max-w-xs"
      variant="bordered"
      classNames={{
        label: "group-data-[filled=true]:-translate-y-5 text-default-900",
        trigger: "min-h-16 border border-default-600 rounded-md",
        listboxWrapper: "max-h-[400px]",
      }}
      listboxProps={{
        itemClasses: {
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        },
      }}
      popoverProps={{
        classNames: {
          base: "before:bg-default-400",
          content: "p-0 border-small border-divider bg-background rounded-md",
        },
      }}
      renderValue={(items) => {
        if (items.length > 1) {
          return (
            <div className="flex items-center gap-2">
              {items.map((item) => (
                <div key={item.key}>
                  <Avatar
                    key={item.key}
                    alt={`${item.data.firstName} ${item.data.lastName}`}
                    className="flex-shrink-0"
                    size="sm"
                    // src={item.data.profileImg}
                    src="https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png"
                  />
                </div>
              ))}
              <span className="text-default-600 text-right text-tiny">
                {items.length} selected
              </span>
            </div>
          );
        } else if (items.length === 1) {
          const item = items[0];
          return (
            <div className="flex items-center gap-2">
              <Avatar
                alt={`${item.data.firstName} ${item.data.lastName}`}
                className="flex-shrink-0"
                size="sm"
                // src={item.data.profileImg}
                src="https://d2u8k2ocievbld.cloudfront.net/memojis/female/4.png"
              />
              <div className="flex flex-col">
                <span>
                  {item.data.firstName} {item.data.lastName}
                </span>
                <span className="text-default-500 text-tiny">
                  ({item.data.email})
                </span>
              </div>
            </div>
          );
        } else {
          return null;
        }
      }}
    >
      {(user) => (
        <SelectItem
          key={user._id}
          textValue={`${user.firstName} ${user.lastName}`}
        >
          <div className="flex gap-2 items-center">
            <Avatar
              alt={`${user.firstName} ${user.lastName}`}
              className="flex-shrink-0"
              size="sm"
              //   src={user.profileImg}
              src="https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png"
            />
            <div className="flex flex-col">
              <span className="text-small">
                {user.firstName} {user.lastName}
              </span>
              <span className="text-tiny text-default-400">{user.email}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};

UserSelect.propTypes = {
  label: PropTypes.string.isRequired,
  selectionMode: PropTypes.oneOf(["single", "multiple"]),
  placeholder: PropTypes.string,
  selectedKeys: PropTypes.instanceOf(Set),
  onSelectionChange: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      profileImg: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UserSelect;
