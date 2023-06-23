import { Badge, Button, Flex, List, Tabs, Text } from "@mantine/core";
import { DiscordIcon } from "@mantine/ds";
import type { ActionArgs, LoaderFunction } from "@remix-run/node";
import { type V2_MetaFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import type { DiscordUser } from "~/auth.server";
import { auth } from "~/auth.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "MakeupDB" },
    { name: "description", content: "Beautify Yourself" },
  ];
};

export let loader: LoaderFunction = async ({ request }) => {
  return await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};

export async function action({ request }: ActionArgs) {
  await auth.logout(request, { redirectTo: "/" });
}

export default function App() {
  const user = useLoaderData<DiscordUser>();
  return (
    <div>
      <Tabs
        color="red"
        variant="pills"
        radius="md"
        orientation="vertical"
        defaultValue="home"
        ml={10}
      >
        <Tabs.List>
          <Tabs.Tab
            value="home"
            style={{ fontSize: "32px", fontWeight: "bold" }}
          >
            Home
          </Tabs.Tab>
          <Tabs.Tab
            value="bot"
            style={{ fontSize: "32px", fontWeight: "bold" }}
          >
            Bot
          </Tabs.Tab>
          <Tabs.Tab
            value="recommend"
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              alignItems: "center",
            }}
            disabled
          >
            <Flex direction="row" justify="center">
              Review {"  "}
              <Badge color="red" size="xl" radius="md">
                SOON
              </Badge>
            </Flex>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="home">
          <Flex justify={"center"} mx="auto" direction={"column"} maw={500}>
            <Text align="center" size="xl" fw={700} pb={20}>
              Welcome to MakeupDB, {user.displayName}#{user.discriminator}
            </Text>
            <Text align="center" size="md" weight={"bolder"} pb={10}>
              Check out our MakeupBot on the left, our official A.I that gives
              you the latest and greatest makeup recommendations. Additionally,
              connect with fellow MakeupDB enthusiasts and get exclusive support
              on our Discord server!
            </Text>

            <Flex align="center" direction="column">
              <Link
                target="blank"
                to="https://discord.gg/WqGmXsQS"
                rel="prefetch"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <Button
                  variant="outline"
                  leftIcon={<DiscordIcon size="1rem" />}
                  color="#5865F2"
                  radius="md"
                  size="md"
                  mb={30}
                  mt={30}
                >
                  Discord Server
                </Button>
              </Link>
              <Form method="post">
                <Button type="submit">Logout</Button>
              </Form>
            </Flex>
          </Flex>
        </Tabs.Panel>

        <Tabs.Panel value="bot">
          <Flex justify={"center"} mx="auto" direction={"column"}>
            <Text align="center" size="xl" fw={700}>
              Ask Makeup Bot for help!
            </Text>
            <Flex align="center" direction="column">
              <Text size="md" fw={500}>
                Ask questions related to makeup based on your traits. For
                example:
              </Text>
              <List withPadding mb={30}>
                <List.Item>
                  What lipsticks to you recommend for a 25-year-old with dry
                  skin?
                </List.Item>

                <List.Item>
                  What is the most trending red mascara currently?
                </List.Item>
              </List>
              <Text align="left" size="md">
                Makeup Covered:
              </Text>
              <List withPadding>
                <List.Item>
                  <Text component="span" inherit fw={"bold"}>
                    Cheek:{" "}
                  </Text>
                  Blush, Bronzer
                </List.Item>
                <List.Item>
                  <Text component="span" inherit fw={"bold"}>
                    Face:{" "}
                  </Text>
                  Color Corrector, Concealer, Contour, Face Primer, Highlighter,
                  Liquid Foundation, Loose Powder, Pressed Powder, Setting Spray
                </List.Item>
                <List.Item>
                  <Text component="span" inherit fw={"bold"}>
                    Eye:{" "}
                  </Text>
                  Eyelash Serum, Eye Primer, Makeup Pencil, Eyeliner, Eyeshadow
                  Palettes, Eyeshadow, Mascara
                </List.Item>
                <List.Item>
                  <Text component="span" inherit fw={"bold"}>
                    Lip:{" "}
                  </Text>
                  Lip balm, Lip gloss, Lip liner, Lip plumper, Lipstick
                </List.Item>
              </List>
            </Flex>

            <Flex justify="center">
              <iframe
                src="https://chat.berri.ai/aHR0cHM6Ly9zdG9yZXF1ZXJ5YWJoaTItYXlsdS56ZWV0LWJlcnJpLnplZXQuYXBwL2JlcnJpX3F1ZXJ5P3Byb2pfcGF0aD1pbmRleGVzL2NocmlzLmhhaWxleThAZ21haWwuY29tLzY2OTI3MGJhLTU2NDUtNGM4OS05OTczLTIyN2U5ZDk3NWE1OA=="
                title="Ask Makeup Bot"
                width="800"
                height="800"
              />
            </Flex>
          </Flex>
        </Tabs.Panel>

        <Tabs.Panel value="recommend">For you page</Tabs.Panel>
      </Tabs>
    </div>
  );
}
