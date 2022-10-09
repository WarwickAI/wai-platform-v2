import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { Badge, Button, Flex, Text } from "@chakra-ui/react";
import ItemGrid from "../components/ItemGrid";
import Card from "../components/Card";
import { fDate, parseDashDateTime } from "../utils/formatTime";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRouter } from "next/router";

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const router = useRouter();

  //  post schema: { cover, title, view, comment, share, author, createdAt }
  useEffect(() => {
    fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/warwick-artificial-intelligence"
    )
      .then(async (data) => {
        const res = (await data.json()).items;
        const posts = res.map((mediumPost: any) => ({
          id: mediumPost.guid,
          cover: mediumPost.thumbnail,
          title: mediumPost.title,
          createdAt: parseDashDateTime(mediumPost.pubDate),
          view: 1,
          comment: 1,
          share: 1,
          favorite: 1,
          author: {
            name: mediumPost.author,
            avatarUrl: `/static/logo2.png`,
          },
          link: mediumPost.link,
          categories: mediumPost.categories,
        }));
        setPosts(posts);
      })
      .catch((e) => {
        console.log("Failed to retrieve medium blogs.");
        console.log(e);
      });
  }, []);

  return (
    <Dashboard title="Blog">
      <Flex
        my={4}
        p={2}
        bg="gray.100"
        borderRadius={"lg"}
        justifyContent="center"
        alignItems="center"
      >
        <Text fontWeight={700} mr={4} fontSize={"1.2rem"}>
          Interested in working on research?
        </Text>
        <Button
          onClick={() => router.push("/research-apply-22")}
          variant={"primary"}
          px={8}
        >
          Apply Here
        </Button>
      </Flex>

      <ItemGrid>
        {posts.map(
          ({ title, cover, categories, id, link, createdAt, author }) => {
            console.log(link);
            return (
              <Card
                key={id}
                title={title}
                backgroundImg={cover}
                description={categories.map((category: string) => (
                  <Badge
                    key={category}
                    colorScheme="green"
                    borderRadius="lg"
                    mr={2}
                  >
                    {category}
                  </Badge>
                ))}
                extraInfo={fDate(createdAt) + " - " + author.name}
                linkPrefix="projects"
                redirect={link}
                execRedirect={true}
                shortName="toMakeWork"
              />
            );
          }
        )}
      </ItemGrid>
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Blog);
