import React, { useMemo, useState } from "react";
import { MantineReactTable } from "mantine-react-table";
import { useQuery } from "@tanstack/react-query";
import { Drawer, TextInput, Button, Group, Notification } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "@mantine/core/styles.css";
import "mantine-react-table/styles.css";
import { notifications } from "@mantine/notifications";

const fetchTodos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

export const MantineTable = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "completed",
        header: "Completed",
        Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
      },
    ],
    []
  );

  const handleRowClick = (row) => {
    setSelectedRowData(row.original);
    setIsEditable(false);
    setIsModified(false);
    open();
  };

  const handleEditToggle = () => {
    if (isEditable && isModified) {
      console.log("Saving data...", selectedRowData);
    }
    setIsEditable(!isEditable);
    setIsModified(false);
  };

  const handleChange = (field, value) => {
    setSelectedRowData((prev) => ({ ...prev, [field]: value }));
    setIsModified(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", selectedRowData);
    close();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Edit Row Data" size="lg">
        {selectedRowData && (
          <form onSubmit={handleSubmit}>
            <TextInput label="ID" value={selectedRowData.id || ""} disabled />
            <TextInput
              label="Title"
              value={selectedRowData.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              required
              disabled={!isEditable}
            />
            <TextInput
              label="Completed"
              value={selectedRowData.completed ? "Yes" : "No"}
              onChange={(e) =>
                handleChange("completed", e.target.value === "Yes")
              }
              required
              disabled={!isEditable}
            />
            <Group position="right" mt="md">
              <Button
                type="button"
                color={isEditable && isModified ? "green" : "blue"}
                onClick={() => {
                  handleEditToggle();

                  {
                    isEditable &&
                      isModified &&
                      notifications.show({
                        position: "top-right",
                        title: "Data Saved !",
                        message: "Your changes has been recorded succesfully.",
                      });
                  }
                }}
              >
                {isEditable ? (isModified ? "Save" : "Edit") : "Edit"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  close();
                }}
                disabled={isEditable && isModified}
              >
                Cancel
              </Button>
            </Group>
          </form>
        )}
      </Drawer>
      <MantineReactTable
        columns={columns}
        data={data || []}
        mantineTableBodyRowProps={({ row }) => ({
          onClick: () => handleRowClick(row),
          style: { cursor: "pointer" },
        })}
      />
    </>
  );
};
