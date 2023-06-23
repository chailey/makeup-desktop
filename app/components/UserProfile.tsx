import { Avatar, Group, Text } from "@mantine/core";

interface UserProfileProps {
  avatar: string;
  displayName: string;
}

export function UserProfile({ avatar, displayName }: UserProfileProps) {
  return (
    <div>
      <Group noWrap>
        <Avatar src={avatar} size={94} radius="lg" />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            Welcome
          </Text>

          <Text fz="lg" fw={500}>
            {displayName}
          </Text>
        </div>
      </Group>
    </div>
  );
}
