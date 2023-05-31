import { Badge, Flex, List, Tabs, Text } from "@mantine/core";
import type { V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BrowseCarousel } from "../components/BrowseCarousel";
import { SearchForm } from "../components/SearchForm";
import { getAllProducts } from "../models/product.server";
export const meta: V2_MetaFunction = () => {
  return [
    { title: "MakeupDB" },
    { name: "description", content: "Beautify Yourself" },
  ];
};

export async function loader() {
  const products = await getAllProducts();
  return products;
}

export default function App() {
  const products = useLoaderData();
  return (
    <div>
      <Tabs
        color="red"
        variant="pills"
        radius="md"
        orientation="vertical"
        defaultValue="bot"
        ml={10}
      >
        <Tabs.List>
          <Tabs.Tab
            value="bot"
            style={{ fontSize: "32px", fontWeight: "bold" }}
          >
            Bot
          </Tabs.Tab>
          <Tabs.Tab
            value="browse"
            style={{ fontSize: "32px", fontWeight: "bold" }}
          >
            Browse
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
              For You {"  "}
              <Badge color="red" size="xl" radius="md">
                SOON
              </Badge>
            </Flex>
          </Tabs.Tab>
        </Tabs.List>

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
              <List withPadding>
                <List.Item>
                  What lipsticks to you recommend for a 25-year-old with dry
                  skin?
                </List.Item>

                <List.Item>
                  What is the most trending red mascara currently?
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

        <Tabs.Panel value="browse">
          <Flex justify={"center"} mx="auto" direction={"column"}>
            <Text align="center" size="xl" fw={700}>
              Browse our makeup on your own!
            </Text>
            <SearchForm />
            <BrowseCarousel products={products} />
          </Flex>
        </Tabs.Panel>

        <Tabs.Panel value="recommend">For you page</Tabs.Panel>
      </Tabs>
    </div>
  );
}
