import { Flex, Text, Title } from "@mantine/core";
import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "MakeupDB" },
    { name: "description", content: "Beautify Yourself" },
  ];
};

export default function About() {
  return (
    <div>
      <Flex justify={"center"} mx="auto" direction={"column"} maw="700px">
        <Title order={1} color="red">
          Next Generation Makup Shopping
        </Title>

        <Text size="md" mt={30}>
          We combine multiple AI models to help discover your personal taste and
          preferences in makeup. No more scrolling through Reddit or TikTok and
          forgetting who is on your FYP. No more going into Sephora and not
          knowing where to start. And this site is to be used by everyone, not
          just makeup enthusiasts -- in fact, husbands and boyfriends should
          really take note!
          <Text fw={700}>
            {" "}
            Learn what makes your partner glow. You do not want to just be
            another bag carrier or bench warmer when they are shopping.
          </Text>
        </Text>

        <Title order={1} color="red" mt={50}>
          Contact Us
        </Title>

        <Text size="md" mt={30}>
          Have any questions? Would like to work together? Feel free to reach
          the main guy{" "}
          <a
            href="https://linkedin.com/in/chrishailey8"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Chris
          </a>{" "}
          on Telegram @chailey or on Discord .chailey.
        </Text>
      </Flex>
    </div>
  );
}
