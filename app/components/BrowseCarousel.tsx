import {
  Badge,
  Box,
  Button,
  Card,
  CheckIcon,
  ColorSwatch,
  Group,
  Image,
  Modal,
  SimpleGrid,
  Text,
  Tooltip,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { Prisma, product } from "@prisma/client";
import { useState } from "react";
import { VideoStream } from "./VideoStream";

const ProductCard = (props: { product: product }) => {
  const [opened, { open, close }] = useDisclosure(false);

  interface Color {
    hex: string;
    name: string;
    number: number;
  }
  const [checkedColor, setCheckedColor] = useState("");
  const jsonColors = props.product.colors as Prisma.JsonObject[];

  const colors = jsonColors.map((color) => {
    return {
      hex: color["hex"]?.toString() || "",
      name: color["name"]?.toString() || "",
      number: color["number"]?.toString() || "",
    };
  });

  const swatches = colors.map(
    (color) =>
      color.hex &&
      color.name &&
      color.number && (
        <Tooltip key={color.hex} label={color.number + " - " + color.name}>
          <ColorSwatch
            color={color.hex}
            component="button"
            onClick={() =>
              setCheckedColor(checkedColor === color.hex ? "" : color.hex)
            }
            sx={{ color: "#fff", cursor: "pointer" }}
          >
            {checkedColor !== "" && checkedColor === color.hex && (
              <CheckIcon width={rem(10)} />
            )}
          </ColorSwatch>
        </Tooltip>
      )
  );

  return (
    <>

      <Modal
        opened={opened}
        onClose={close}
        title="Makeup AR"
        centered
        maw={500}
      >
        <Text align="center" size="lg" fw={400}>
          Warning: Beta Feature
        </Text>
        {checkedColor !== "" && <VideoStream colorHex={checkedColor} />}
        {checkedColor === "" && <Text>Please select a color first!</Text>}
      </Modal>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image src={props.product.image} height={200} alt="Image" />
        </Card.Section>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={600}>{props.product.brand}</Text>
          <Badge color="red" variant="light">
            {props.product.type}
          </Badge>
        </Group>
        <Text size="md" weight={500}>
          {props.product.title}
        </Text>

        <Group position="center" spacing="xs">
          {swatches}
        </Group>

        <Tooltip label="Select a Color before trying on">
          <Button
            variant="light"
            color="red"
            fullWidth
            mt="md"
            radius="md"
            disabled={!checkedColor}
            onClick={open}
          >
            Try On
          </Button>
        </Tooltip>

      </Card>
    </>
  );
};

export const BrowseCarousel = (props: { products: product[] }) => {
  return (
    <>
      <Box mx="auto" maw={600} pb="lg">
        <Text weight={600} size="lg">
          Lips
        </Text>
        <SimpleGrid cols={3}>
          {props.products.map((product: product, i: number) => (
            <ProductCard key={i} product={product} />
          ))}
        </SimpleGrid>
      </Box>
      <Box mx="auto" maw={600} pb="lg">
        <Text weight={600} size="lg">
          Eyes
        </Text>
      </Box>
      <Box mx="auto" maw={600} pb="lg">
        <Text weight={600} size="lg">
          Face
        </Text>
      </Box>
    </>
  );
};
