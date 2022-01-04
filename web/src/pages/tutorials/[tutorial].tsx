import { Heading, Button, HStack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import {
  useJoinTutorialMutation,
  useMeQuery,
  useTutorialByShortNameQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import ReactMarkdown from "react-markdown";
import { isServer } from "../../utils/isServer";

interface TutorialProps {}

const Tutorial: React.FC<TutorialProps> = ({}) => {
  const router = useRouter();
  const { tutorial } = router.query;
  const [{ data }] = useTutorialByShortNameQuery({
    variables: { shortName: tutorial as string },
  });
  const [{ data: userInfo, fetching: fetchingUser }, fetchMe] = useMeQuery({
    pause: isServer(),
  });
  
  const [, joinTutorial] = useJoinTutorialMutation();

  useEffect(() => {
    // Redirect if tutorial has a redirect and not exec
    if (
      !fetchingUser &&
      data?.tutorialByShortName &&
      data?.tutorialByShortName.redirect.length > 0
    ) {
      if (userInfo?.me?.role !== "exec") {
        router.replace(data.tutorialByShortName.redirect);
      }
    }
  }, [data, fetchingUser, router, userInfo?.me?.role]);

  return (
    <Dashboard
      title={data?.tutorialByShortName ? data?.tutorialByShortName.title : ""}
      narrow={true}
      options={
        <HStack>
          {userInfo?.me?.role === "exec" &&
            data?.tutorialByShortName &&
            data?.tutorialByShortName.redirect.length > 0 && (
              <Button
                variant="primary"
                onClick={() =>
                  data?.tutorialByShortName?.redirect
                    ? router.push(data.tutorialByShortName.redirect)
                    : {}
                }
              >
                Follow Redirect
              </Button>
            )}
          {data?.tutorialByShortName && data.tutorialByShortName.joinButton && (
            <Button
              variant="primary"
              onClick={async () => {
                if (data.tutorialByShortName) {
                  console.log(data.tutorialByShortName.id);
                  const response = await joinTutorial({
                    tutorialId: data.tutorialByShortName.id,
                    shortName: data.tutorialByShortName.shortName,
                  });
                  if (response.data?.joinTutorial) {
                    console.log("JOINED TUTORIAL");
                    fetchMe();
                  } else {
                    console.log("FAILED JOINING TUTORIAL");
                  }
                }
              }}
              disabled={
                userInfo?.me?.tutorials.findIndex(
                  ({ shortName }) => shortName == tutorial
                ) !== -1
              }
            >
              {userInfo?.me?.tutorials.findIndex(
                ({ shortName }) => shortName == tutorial
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
                  `/tutorials/edit/${data?.tutorialByShortName?.shortName}`
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
                  `/tutorials/manage/${data?.tutorialByShortName?.shortName}`
                )
              }
            >
              Manage
            </Button>
          )}
        </HStack>
      }
    >
      {data?.tutorialByShortName?.description && (
        <ReactMarkdown>{data?.tutorialByShortName?.description}</ReactMarkdown>
      )}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Tutorial);
