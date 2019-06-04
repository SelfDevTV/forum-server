import { Button, Container } from "@material-ui/core";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = props => {
  const [test, setTest] = useState("");

  return (
    <Container>
      <Link href="/api/auth/facebook">
        <Button variant="contained" color="secondary">
          Login
        </Button>
      </Link>
    </Container>
  );
};

export default Home;
