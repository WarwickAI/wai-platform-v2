import { Heading, Button } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import {
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
  const [{ data: userInfo, fetching: fetchingUser }] = useMeQuery({
    pause: isServer(),
  });

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
        userInfo?.me?.role === "exec" ? (
          <>
            {data?.talkByShortName &&
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
          </>
        ) : (
          <>
            {data?.talkByShortName &&
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
          </>
        )
      }
    >
      {data?.talkByShortName?.description && (
        <ReactMarkdown>{data?.talkByShortName?.description}</ReactMarkdown>
      )}
    </Dashboard>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Talk);
