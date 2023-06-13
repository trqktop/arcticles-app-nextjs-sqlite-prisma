import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

type Label = {
  [key: string]: string;
};
const getFormatedDate = (date: string) => {
  const formatedDate = new Date(date);
  return `${formatedDate.getDate()}.${
    formatedDate.getMonth() + 1
  }.${formatedDate.getFullYear()} ${formatedDate.getHours()}:${formatedDate.getSeconds()}`;
};
const labels: Label[] = [
  { primary: "name", secondary: "имя" },
  { primary: "surname", secondary: "фамилия" },
  { primary: "lastname", secondary: "отчество" },
  { primary: "email", secondary: "почта" },
  { primary: "role", secondary: "роль" },
  { primary: "serial", secondary: "серия документа" },
  { primary: "number", secondary: "номер документа" },
  { primary: "date", secondary: "дата рождения" },
];

const ProfileInfo = ({ user }: any) => {
  return (
    <Table>
      <TableBody>
        {labels.map(({ primary, secondary }, index) => {
          let data = user[primary];
          if (user[primary]) {
            if (secondary === "дата рождения") {
              data = getFormatedDate(user[primary]).split(" ")[0];
            }
            if (secondary === "роль") {
              data = user[primary] === "1" ? "Админ" : "Пользователь";
            }
            return (
              <TableRow key={index} style={{ display: "flex" }}>
                <TableCell style={{ width: "134px", border: "none" }}>
                  <Typography style={{ color: "gray" }} variant="subtitle1">
                    {secondary}
                  </Typography>
                </TableCell>
                <TableCell style={{ width: "134px", border: "none" }}>
                  {data}
                </TableCell>
              </TableRow>
            );
          } else {
            return null;
          }
        })}
      </TableBody>
    </Table>
  );
};

export default React.memo(ProfileInfo);
