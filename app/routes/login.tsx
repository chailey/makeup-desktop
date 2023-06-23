import { Flex } from "@mantine/core";
import { LoginForm } from "~/components/LoginForm";

export default function Login() {
  return (
    <div>
      <Flex justify={"center"} mx="auto" direction={"column"} maw="700px">
        <LoginForm />
      </Flex>
    </div>
  );
}
