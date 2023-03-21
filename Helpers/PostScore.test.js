import { withPlanetscale } from "@netlify/planetscale";

const PostEvent = () => {
  const handler = withPlanetscale(async (event, context) => {
    const {
      planetscale: { connection },
    } = context;

    const { body } = event;

    if (!body) {
      return {
        statusCode: 400,
        body: "Missing body",
      };
    }

    const { email, name } = JSON.parse(body);

    await connection.execute("INSERT INTO users (email, name) VALUES (?, ?)", [
      email,
      name,
    ]);

    return {
      statusCode: 201,
    };
  });

  return <button onClick={handler}>Click me</button>;
};

export default PostEvent;