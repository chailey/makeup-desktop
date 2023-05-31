import {
  Button,
  Container,
  Group,
  Text,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import { Link } from "@remix-run/react";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
  },

  title: {
    color: "#CF0000",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: rem(500),
    fontSize: rem(96),

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: rem(64),
      lineHeight: 1.15,
    },
  },

  description: {
    color: "#F16D6D",
    maxWidth: "80%",
    fontSize: rem(48),
    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: rem(32),
      lineHeight: 1.15,
    },
  },
  emphasizeDescription: {
    color: "#F16D6D",
    fontSize: rem(48),
    fontWeight: 700,
    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: rem(32),
      lineHeight: 1.15,
    },
  },

  control: {
    paddingLeft: rem(50),
    paddingRight: rem(50),
    color: "white",
    background: "#CF0000",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(22),

    [theme.fn.smallerThan("md")]: {
      width: "100%",
    },
  },
}));

export function HeroHomepage() {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div>
            <Title className={classes.title}>BEAUTY, SUPERCHARGED.</Title>

            <Text className={classes.description} mt={30}>
              A better place to discover new makeup. Custom tailored{" "}
              <Text
                component="span"
                inherit
                underline
                className={classes.emphasizeDescription}
              >
                just for you.
              </Text>
            </Text>
            <Group spacing="xl">
              <Link
                to="/app"
                rel="prefetch"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <Button
                  variant="outline"
                  color="red"
                  radius="md"
                  size="xl"
                  mt={40}
                >
                  Try Now
                </Button>
              </Link>

              <Link
                to="/about"
                rel="prefetch"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <Button
                  variant="light"
                  color="red"
                  radius="md"
                  size="xl"
                  mt={40}
                >
                  Learn More
                </Button>
              </Link>
            </Group>
          </div>
        </div>
      </Container>
    </div>
  );
}
