import { Button, Container } from "@material-ui/core";
import Link from "next/link";

const Home = props => {
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