import { Typography } from "@mui/joy";

const DateComponent = ({ date, title }: { date: string; title: string }) => {
  const getFormatedDate = () => {
    const formatedDate = new Date(date);
    return `${formatedDate.getDate()}.${
      formatedDate.getMonth() + 1
    }.${formatedDate.getFullYear()} ${formatedDate.getHours()}:${formatedDate.getSeconds()}`;
  };

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

export default DateComponent;
