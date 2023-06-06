import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

// user:  {
//   "id": "e0ff3b36-448e-40ff-a9a8-ecd84dd2b09a",
//   "name": "dasd",
//   "email": "sada",
//   "surname": "asdas",
//   "password": "asd",
//   "role": "1",
//   "lastname": "asda",
//   "serial": "sdas",
//   "number": "dasd",
//   "date": null,
//   "emailVerified": null,
//   "image": null,
//   "posts": [
//       {
//           "id": "f2869524-3090-44d6-8817-0c525168ecc8",
//           "title": "power",
//           "content": "power",
//           "published": true,
//           "createdAt": "2023-06-06T14:54:36.697Z",
//           "updatedAt": "2023-06-06T14:54:36.697Z",
//           "deletedAt": null,
//           "authorId": "e0ff3b36-448e-40ff-a9a8-ecd84dd2b09a"
//       },
//       {
//           "id": "84aae27f-1f00-493e-87bb-0b9a64875a16",
//           "title": "asd",
//           "content": "asdasd",
//           "published": true,
//           "createdAt": "2023-06-06T15:07:37.097Z",
//           "updatedAt": "2023-06-06T15:07:37.097Z",
//           "deletedAt": null,
//           "authorId": "e0ff3b36-448e-40ff-a9a8-ecd84dd2b09a"
//       }
//   ]
// }

const Profile = ({ user }: any) => {
  if (user) {
    const parsedUser = JSON.parse(user);
    const { name, email, role , surname , lastname } = parsedUser;
    return (
      <div>
        <h1>
          name:{name}, lastname  : {lastname},  email:{email}, role:{role} , surname : {surname}
        </h1>
      </div>
    );
  }
  return null;
};
export default Profile;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (typeof params?.id == "string") {
    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
      include: {
        posts: true,
      },
    });
    return { props: { user: JSON.stringify(user) } };
  }
  return { props: { user: null } };
};
