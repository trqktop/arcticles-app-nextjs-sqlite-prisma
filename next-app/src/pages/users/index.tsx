import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import React, { memo, useCallback, useState } from "react";
import UserList from "@/components/UserList";

type Props = {
  data: string;
};

const Users: React.FC<Props> = ({ data }) => {
  const session = useSession();
  const [state, setState] = useState({
    users: JSON.parse(data),
  });
  console.log(state.users)
  const deleteUserHandler = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      setState((p) => ({ ...p, users: result.data }));
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (session.data?.user.role === "1")
    return (
      <UserList users={state.users} deleteUserHandler={deleteUserHandler} />
    );
  return null;
};

export default memo(Users);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session && session.user.role !== "1") {
    return { redirect: { destination: "/", permanent: true }, props: [] };
  }
  // const users = await prisma.user.findMany({
  //   include: {
  //     posts: {
  //       include: {
  //         author: true,
  //         file: {
  //           select: {
  //             id: true,
  //             name: true,
  //           },
  //         },
  //       },
  //       orderBy: [
  //         {
  //           createdAt: "desc",
  //         },
  //       ],
  //       where: {
  //         published: true,
  //       },
  //     },
  //   },
  // });
const users = [
  {
      "id": "c634cfc6-53b6-46f4-85ac-b40ce4999437",
      "name": "ssss",
      "email": "sss@ss.ss",
      "surname": "ssss",
      "password": "sdadsa",
      "role": "1",
      "lastname": null,
      "serial": null,
      "number": null,
      "date": null,
      "emailVerified": null,
      "image": null,
      "posts": []
  },
  {
      "id": "e4862ac8-2b89-4711-80a2-d738fecab5a1",
      "name": "sadasdas",
      "email": "ssss@sss.ss",
      "surname": "asdasdads",
      "password": "sssssss",
      "role": "1",
      "lastname": "asdasdas",
      "serial": "asdasdasd",
      "number": "asdasdasds",
      "date": "2023-06-06T06:16:43.360Z",
      "emailVerified": null,
      "image": null,
      "posts": []
  },
  {
      "id": "d2198512-4e71-4487-9628-d7798ee29678",
      "name": "asdsadsass",
      "email": "asdasdas@sadsa.sss",
      "surname": "sssss",
      "password": "saddsadsdsa",
      "role": "1",
      "lastname": "sssss",
      "serial": "sssss",
      "number": "ssssss",
      "date": "2023-06-15T06:21:40.669Z",
      "emailVerified": null,
      "image": null,
      "posts": [
          {
              "id": "3f6a8d15-8b37-4f25-9960-98fbcc6502a2",
              "title": "asdasdasdsad",
              "content": "dsasdaasdsdasdadas",
              "published": true,
              "createdAt": "2023-06-14T06:41:04.867Z",
              "updatedAt": "2023-06-14T06:41:04.867Z",
              "deletedAt": null,
              "authorId": "d2198512-4e71-4487-9628-d7798ee29678",
              "fileId": null,
              "author": {
                  "id": "d2198512-4e71-4487-9628-d7798ee29678",
                  "name": "asdsadsass",
                  "email": "asdasdas@sadsa.sss",
                  "surname": "sssss",
                  "password": "saddsadsdsa",
                  "role": "1",
                  "lastname": "sssss",
                  "serial": "sssss",
                  "number": "ssssss",
                  "date": "2023-06-15T06:21:40.669Z",
                  "emailVerified": null,
                  "image": null
              },
              "file": null
          },
          {
              "id": "dd0bb4dc-f790-49d7-abb7-98d36bd243e0",
              "title": "asdasdsa",
              "content": "asdasdadadas",
              "published": true,
              "createdAt": "2023-06-14T06:24:57.903Z",
              "updatedAt": "2023-06-14T06:24:57.903Z",
              "deletedAt": null,
              "authorId": "d2198512-4e71-4487-9628-d7798ee29678",
              "fileId": null,
              "author": {
                  "id": "d2198512-4e71-4487-9628-d7798ee29678",
                  "name": "asdsadsass",
                  "email": "asdasdas@sadsa.sss",
                  "surname": "sssss",
                  "password": "saddsadsdsa",
                  "role": "1",
                  "lastname": "sssss",
                  "serial": "sssss",
                  "number": "ssssss",
                  "date": "2023-06-15T06:21:40.669Z",
                  "emailVerified": null,
                  "image": null
              },
              "file": null
          },
          {
              "id": "54307ebe-51d8-4b07-81b0-9fc5ea28a4c8",
              "title": "ssssss",
              "content": "asdasdasdasasd",
              "published": true,
              "createdAt": "2023-06-14T06:22:01.416Z",
              "updatedAt": "2023-06-14T06:22:01.416Z",
              "deletedAt": null,
              "authorId": "d2198512-4e71-4487-9628-d7798ee29678",
              "fileId": null,
              "author": {
                  "id": "d2198512-4e71-4487-9628-d7798ee29678",
                  "name": "asdsadsass",
                  "email": "asdasdas@sadsa.sss",
                  "surname": "sssss",
                  "password": "saddsadsdsa",
                  "role": "1",
                  "lastname": "sssss",
                  "serial": "sssss",
                  "number": "ssssss",
                  "date": "2023-06-15T06:21:40.669Z",
                  "emailVerified": null,
                  "image": null
              },
              "file": null
          }
      ]
  },
  {
      "id": "5b44d338-4eef-43db-8761-b1eb4939d50d",
      "name": "asdsaasd",
      "email": "sdads@sadas.ss",
      "surname": "asdasdasd",
      "password": "asdasdas",
      "role": "1",
      "lastname": "sassasa",
      "serial": "asdasdasd",
      "number": "asdasdasd",
      "date": "2023-06-21T06:31:00.409Z",
      "emailVerified": null,
      "image": null,
      "posts": []
  },
  {
      "id": "400f3137-1a8f-4392-85a0-8a564496826b",
      "name": "Ffddd",
      "email": "Ddd@ddd.dd",
      "surname": "Ffddd",
      "password": "fjddjjs",
      "role": "1",
      "lastname": "Ffddd",
      "serial": "Cfcd",
      "number": "Ffdddff",
      "date": "2023-06-30T06:44:50.712Z",
      "emailVerified": null,
      "image": null,
      "posts": []
  },
  {
      "id": "e59a8047-0f1e-4b2a-9507-d67fc9fd3994",
      "name": "dasdasdas",
      "email": "asddsa@saddassd.ss",
      "surname": "dasdasdasdsa",
      "password": "sadasdasd",
      "role": "1",
      "lastname": "dasdasdasd",
      "serial": "asdasdasd",
      "number": "assssss",
      "date": "2023-06-05T06:46:16.310Z",
      "emailVerified": null,
      "image": null,
      "posts": []
  },
  {
      "id": "c9eb2bcb-cb88-4726-bb6a-0d9314f899ab",
      "name": "dsadasdas",
      "email": "saddsadas@sadadsa.ss",
      "surname": "dasdasd",
      "password": "asdsadas",
      "role": "1",
      "lastname": "sadasdasd",
      "serial": "asdsadas",
      "number": "dsadasdsad",
      "date": "2023-06-13T06:53:38.003Z",
      "emailVerified": null,
      "image": null,
      "posts": [
          {
              "id": "b3530c01-ace6-4c19-a857-fb6ce9e16c3b",
              "title": "sa111",
              "content": "111111111111sss",
              "published": true,
              "createdAt": "2023-06-14T06:53:47.632Z",
              "updatedAt": "2023-06-14T06:53:54.068Z",
              "deletedAt": null,
              "authorId": "c9eb2bcb-cb88-4726-bb6a-0d9314f899ab",
              "fileId": null,
              "author": {
                  "id": "c9eb2bcb-cb88-4726-bb6a-0d9314f899ab",
                  "name": "dsadasdas",
                  "email": "saddsadas@sadadsa.ss",
                  "surname": "dasdasd",
                  "password": "asdsadas",
                  "role": "1",
                  "lastname": "sadasdasd",
                  "serial": "asdsadas",
                  "number": "dsadasdsad",
                  "date": "2023-06-13T06:53:38.003Z",
                  "emailVerified": null,
                  "image": null
              },
              "file": null
          }
      ]
  },
  {
      "id": "9a482e29-a030-4152-bbeb-3e544447a61d",
      "name": "asdsasadasd",
      "email": "asdsad@asdasd.ss",
      "surname": "sdaasdsad",
      "password": "asdasdsa",
      "role": "1",
      "lastname": "sdasadsad",
      "serial": "sadsdaasd",
      "number": "asasdsasa",
      "date": "2023-06-27T07:53:44.778Z",
      "emailVerified": null,
      "image": null,
      "posts": [
          {
              "id": "6cce4a3a-cd68-47f4-aede-6074b87e2481",
              "title": "asdasdasdasd",
              "content": "adsasdsadasdasd",
              "published": true,
              "createdAt": "2023-06-14T07:54:05.052Z",
              "updatedAt": "2023-06-14T07:54:05.052Z",
              "deletedAt": null,
              "authorId": "9a482e29-a030-4152-bbeb-3e544447a61d",
              "fileId": "103c0052-6612-498c-bf03-5d229971d02b",
              "author": {
                  "id": "9a482e29-a030-4152-bbeb-3e544447a61d",
                  "name": "asdsasadasd",
                  "email": "asdsad@asdasd.ss",
                  "surname": "sdaasdsad",
                  "password": "asdasdsa",
                  "role": "1",
                  "lastname": "sdasadsad",
                  "serial": "sadsdaasd",
                  "number": "asasdsasa",
                  "date": "2023-06-27T07:53:44.778Z",
                  "emailVerified": null,
                  "image": null
              },
              "file": {
                  "id": "103c0052-6612-498c-bf03-5d229971d02b",
                  "name": "197421952.pdf"
              }
          }
      ]
  },
  {
      "id": "9e025594-a769-4253-a934-6ac4adfbee5e",
      "name": "asdasdas",
      "email": "asdasd@asddasd.ss",
      "surname": "dasda",
      "password": "adsadasd",
      "role": "1",
      "lastname": "sdasd",
      "serial": "asdasd",
      "number": "asdasd",
      "date": "2023-06-07T08:06:42.119Z",
      "emailVerified": null,
      "image": null,
      "posts": [
          {
              "id": "18ef6e9f-c6bb-4c71-9a8c-93c82414fc98",
              "title": "saddasdas",
              "content": "dsasaddasasdasdasd",
              "published": true,
              "createdAt": "2023-06-14T08:10:26.172Z",
              "updatedAt": "2023-06-14T08:10:26.172Z",
              "deletedAt": null,
              "authorId": "9e025594-a769-4253-a934-6ac4adfbee5e",
              "fileId": null,
              "author": {
                  "id": "9e025594-a769-4253-a934-6ac4adfbee5e",
                  "name": "asdasdas",
                  "email": "asdasd@asddasd.ss",
                  "surname": "dasda",
                  "password": "adsadasd",
                  "role": "1",
                  "lastname": "sdasd",
                  "serial": "asdasd",
                  "number": "asdasd",
                  "date": "2023-06-07T08:06:42.119Z",
                  "emailVerified": null,
                  "image": null
              },
              "file": null
          },
          {
              "id": "17533d00-fa43-4c1c-8a27-20cb6b3c1676",
              "title": "11111",
              "content": "111111111111",
              "published": true,
              "createdAt": "2023-06-14T08:07:00.408Z",
              "updatedAt": "2023-06-14T08:07:00.408Z",
              "deletedAt": null,
              "authorId": "9e025594-a769-4253-a934-6ac4adfbee5e",
              "fileId": null,
              "author": {
                  "id": "9e025594-a769-4253-a934-6ac4adfbee5e",
                  "name": "asdasdas",
                  "email": "asdasd@asddasd.ss",
                  "surname": "dasda",
                  "password": "adsadasd",
                  "role": "1",
                  "lastname": "sdasd",
                  "serial": "asdasd",
                  "number": "asdasd",
                  "date": "2023-06-07T08:06:42.119Z",
                  "emailVerified": null,
                  "image": null
              },
              "file": null
          }
      ]
  },
  {
      "id": "df534546-e393-493f-b2d7-d48ea2ba66e8",
      "name": "dasdasd",
      "email": "asd@asdas.ss",
      "surname": "asdasdas",
      "password": "asdasdas",
      "role": "1",
      "lastname": "dasdasd",
      "serial": "asdasdasd",
      "number": "sadasda",
      "date": "2023-06-27T08:22:17.995Z",
      "emailVerified": null,
      "image": null,
      "posts": []
  }
]
  return { props: { data: JSON.stringify(users) } };
};
