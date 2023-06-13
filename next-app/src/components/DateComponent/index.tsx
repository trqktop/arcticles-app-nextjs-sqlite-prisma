import { Typography } from "@mui/joy";
import { memo, useCallback } from "react";

const DateComponent = ({ date, title }: { date: string; title: string }) => {
  const getFormatedDate = useCallback(() => {
    const formatedDate = new Date(date);
    const day = formatedDate.getDate().toString().padStart(2, "0");
    const month = (formatedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = formatedDate.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }, [date]);

  return (
    <Typography
      sx={{ fontSize: 12, padding: 0, margin: 0 }}
      gutterBottom
      level="body5"
    >
      {title} {getFormatedDate()}
    </Typography>
  );
};

export default memo(DateComponent);
