import { useMemo } from "react";
import { Badge, useGetBadgeQuery } from "../generated/graphql";

interface BadgeProps {
  id: string;
  badge?: Badge;
}

const BadgeComponent: React.FC<BadgeProps> = (props) => {
  const [{ data: badgeQuery, fetching }] = useGetBadgeQuery({
    variables: { id: props.id },
    pause: !!props.badge,
  });

  const badge = useMemo(() => {
    return props.badge || badgeQuery?.getBadge;
  }, [props.badge, badgeQuery]);

  if (fetching) {
    return <div>Loading...</div>;
  } else if (!badge) {
    return <div>Badge not found</div>;
  } else {
    return <div>{badge.name}</div>;
  }
};

export default BadgeComponent;
