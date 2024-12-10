import React from "react";
import {
  AppShell,
  Burger,
  ScrollArea,
  NavLink,
  Text,
  Avatar,
  Group,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHome, IconSettings, IconUser } from "@tabler/icons-react";
import { MantineTable } from "./MantineTable";

const Task1 = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{
        height: 60,
        styles: {
          backgroundColor: "#1a202c",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
      }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
        styles: {
          backgroundColor: "#f7fafc",
          borderRight: "1px solid #e2e8f0",
        },
      }}
    >
      <AppShell.Header>
        <Group align="center" spacing="sm">
          <Text size="xl" weight="bold" color="white">
            Logo
          </Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ScrollArea>
          <NavLink
            label="Table"
            icon={<IconHome size={18} />}
            active
            styles={{
              root: {
                padding: "10px",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#e2e8f0" },
              },
            }}
          />
          <NavLink
            label="Section 1"
            icon={<IconUser size={18} />}
            styles={{
              root: {
                padding: "10px",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#e2e8f0" },
              },
            }}
          />
          <NavLink
            label="Section 2"
            icon={<IconSettings size={18} />}
            styles={{
              root: {
                padding: "10px",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#e2e8f0" },
              },
            }}
          />
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main
        styles={{
          backgroundColor: "#edf2f7",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Text size="lg" weight="bold" mb="md">
         ToDO's
        </Text>
        <MantineTable />
      </AppShell.Main>
    </AppShell>
  );
};

export default Task1;
