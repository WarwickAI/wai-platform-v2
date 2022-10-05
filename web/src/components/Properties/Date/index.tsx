import { Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface DatePropertyProps {
  value: string;
  onChange: (v: string) => void;
  isEdit: boolean;
}

const DateProperty: React.FC<DatePropertyProps> = (props) => {
  const [date, setDate] = useState<Date | undefined>(
    props.value ? new Date(props.value) : undefined
  );

  useEffect(() => {
    setDate(props.value ? new Date(props.value) : undefined);
  }, [props.value]);

  if (!props.isEdit) {
    return (
      <Text>
        {date
          ? date.toDateString() + "-" + date.toLocaleTimeString()
          : "No Date"}
      </Text>
    );
  } else {
    return (
      <VStack>
        <HStack>
          <Text>
            {date
              ? date.toDateString() + "-" + date.toLocaleTimeString()
              : "No Date"}
          </Text>
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              setDate(new Date(""));
              props.onChange("");
            }}
            disabled={!date}
          >
            X
          </Button>
        </HStack>
        <Input
          type="datetime-local"
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            setDate(newDate);
            props.onChange(newDate.toISOString());
          }}
        />
      </VStack>
    );
  }
};

export default DateProperty;
