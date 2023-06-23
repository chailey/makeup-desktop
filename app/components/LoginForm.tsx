import { Box, Button, ButtonProps, Card, Text } from "@mantine/core";
import { DiscordIcon } from "@mantine/ds";
import { Form } from "@remix-run/react";

export function DiscordButton(props: ButtonProps) {
  return (
    <Button
      leftIcon={<DiscordIcon size="1rem" />}
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? "#5865F2" : "#5865F2",
        "&:not([data-disabled]):hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.fn.lighten("#5865F2", 0.05)
              : theme.fn.darken("#5865F2", 0.05),
        },
      })}
      {...props}
    />
  );
}

export function LoginForm() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder maw={400}>
      <Text weight={500}>Login</Text>

      <Box maw={380} mx="auto">
        <Form action="/auth/discord" method="post">
          <DiscordButton type="submit">Login with Discord</DiscordButton>
        </Form>
      </Box>
    </Card>
  );
}
