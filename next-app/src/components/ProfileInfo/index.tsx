import { memo } from "react";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

type Label = {
  [key: string]: string;
};

const ProfileInfo = ({ user }: any) => {
  const labels: Label[] = [
    { primary: "name", secondary: "имя" },
    { primary: "surname", secondary: "фамилия" },
    { primary: "lastname", secondary: "отчество" },
    { primary: "email", secondary: "почта" },
    // { primary: "role", secondary: "роль" },
    { primary: "serial", secondary: "серия документа" },
    { primary: "number", secondary: "номер документа" },
    { primary: "date", secondary: "дата рождения" },
  ];

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {labels.map(({ primary, secondary }, index) => {
        if (user[primary]) {
          return (
            <ListItem key={index}>
              <ListItemText primary={user[primary]} secondary={secondary} />
            </ListItem>
          );
        } else {
          return null;
        }
      })}
    </List>
  );
};



export default memo(ProfileInfo);