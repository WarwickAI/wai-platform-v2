import { Heading, Button, HStack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import {
  useJoinTalkMutation,
  useMeQuery,
  useTalkByShortNameQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import ReactMarkdown from "react-markdown";
import { isServer } from "../../utils/isServer";

interface TalkProps {}

const Talk: React.FC<TalkProps> = ({}) => {
  const router = useRouter();
  const { talk } = router.query;
  const [{ data }] = useTalkByShortNameQuery({
    variables: { shortName: talk as string },
  });
  const [{ data: userInfo, fetching: fetchingUser }, fetchMe] = useMeQuery({
    pause: isServer(),
  });

  const [, joinTalk] = useJoinTalkMutation();

  useEffect(() => {
    if (
      !fetchingUser &&
      data?.talkByShortName &&
      data?.talkByShortName.redirect.length > 0
    ) {
      if (userInfo?.me?.role !== "exec") {
        router.replace(data.talkByShortName.redirect);
      }
    }
  }, [data, fetchingUser, router, userInfo?.me?.role]);

  return (
    <Dashboard
      title={data?.talkByShortName ? data?.talkByShortName.title : ""}
      narrow={true}
      options={
        <HStack>
          {userInfo?.me?.role === "exec" &&
            data?.talkByShortName &&
            data?.talkByShortName.redirect.length > 0 && (
              <Button
                variant="primary"
                onClick={() =>
                  data?.talkByShortName?.redirect
                    ? router.push(data.talkByShortName.redirect)
                    : {}
                }
              >
                Follow Redirect
              </Button>
            )}
          {data?.talkByShortName && data.talkByShortName.joinButton && (
            <Button
              variant="primary"
              onClick={async () => {
                if (data.talkByShortName) {
                  console.log(data.talkByShortName.id);
                  const response = await joinTalk({
                    talkId: data.talkByShortName.id,
                    shortName: data.talkByShortName.shortName,
                  });
                  if (response.data?.joinTalk) {
                    console.log("JOINED TALK");
                    fetchMe();
                  } else {
                    console.log("FAILED JOINING TALK");
                  }
                }
              }}
              disabled={
                userInfo?.me?.talks.findIndex(
                  ({ shortName }) => shortName == talk
                ) !== -1
              }
            >
              {userInfo?.me?.talks.findIndex(
                ({ shortName }) => shortName == talk
              ) !== -1
                ? "Joined"
                : "Join"}
            </Button>
          )}
          {userInfo?.me?.role === "exec" && (
            <Button
              variant="primary"
              onClick={() =>
                router.push(
                  `/talks/edit/${data?.talkByShortName?.shortName}`
                )
              }
            >
              Edit
            </Button>
          )}
          {userInfo?.me?.role === "exec" && (
            <Button
              variant="primary"
              onClick={() =>
                router.push(
                  `/talks/manage/${data?.talkByShortName?.shortName}`
                )
              }
            >
              Manage
            </Button>
          )}
        </HStack>
      }
    >
      {data?.talkByShortName?.description && (
        <ReactMarkdown>{data?.talkByShortName?.description}</ReactMarkdown>
      )}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Talk);
