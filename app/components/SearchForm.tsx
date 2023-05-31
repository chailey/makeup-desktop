import { Badge, Box, Button, Chip, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

export function SearchForm() {
  const form = useForm({
    initialValues: {
      terms: false,

      user: {
        firstName: "",
        lastName: "",
      },
    },
  });

  return (
    <Box maw={500} mx="auto" pb="lg">
      <Text fw={500}>Category</Text>
      <Chip.Group multiple>
        <Group position="center" mt="md">
          <Chip color="red" value="1">
            Face
          </Chip>
          <Chip color="red" value="2">
            Eyes
          </Chip>
          <Chip color="red" value="3">
            Lip
          </Chip>
        </Group>
      </Chip.Group>

      <Text fw={500}>Age Range</Text>
      <Chip.Group multiple>
        <Group position="center" mt="md">
          <Chip color="red" value="1">
            Early 20s
          </Chip>
          <Chip color="red" value="2">
            Late 20s
          </Chip>
          <Chip color="red" value="3">
            Early 30s
          </Chip>
          <Chip color="red" value="4">
            Late 30s
          </Chip>
        </Group>
      </Chip.Group>

      <Button
        variant="light"
        color="red"
        radius="md"
        size="md"
        mt="md"
        disabled
      >
        Filter <Badge color="red">Coming Soon</Badge>
      </Button>
    </Box>
  );
}
