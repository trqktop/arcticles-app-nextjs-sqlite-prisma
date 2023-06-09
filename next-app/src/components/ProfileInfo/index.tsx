import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

type Label = {
  [key: string]: string;
};
const getFormatedDate = (date: string) => {
  const formatedDate = new Date(date);
  return `${formatedDate.getDate()}.${formatedDate.getMonth() + 1
    }.${formatedDate.getFullYear()} ${formatedDate.getHours()}:${formatedDate.getSeconds()}`;
};

const ProfileInfo = ({ user }: any) => {
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

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Параметр</TableCell>
          <TableCell>Значение</TableCell>
        </TableRow>
      </TableHead>
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
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="subtitle1">{secondary}</Typography>
                </TableCell>
                <TableCell>{data}</TableCell>
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

export default ProfileInfo;