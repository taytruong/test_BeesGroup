export interface TUser {
  id: string;
  name: string;
  balance: number;
  email: string;
  registerAt: Date;
  active: boolean;
}

//demo
// const randomUsers = (count: number): TUser[] => {
//   const names = [
//     "Andrew Taylor",
//     "Alvaro Garcia",
//     "Pedro Moreno",
//     "John Robinson",
//     "Sarah White",
//     "Wiliam King",
//     "Emma Gonzalez",
//     "Ryan Young",
//     "Michael Taylor",
//     "Jennifer King",
//   ];
//   const linkEmail = ["gmail.com", "yahoo.com", "hotmail.com"];
//   const users: TUser[] = [];

//   for (let index = 1; index <= count; index++) {
//     // name
//     const randomName = names[Math.floor(Math.random() * names.length)];

//     //mail
//     const randomEmail = `${randomName
//       .toLowerCase()
//       .replace(" ", "")}${Math.floor(Math.random() * 100)}@${
//       linkEmail[Math.floor(Math.random() * linkEmail.length)]
//     }`;

//     //date (year, month, day, hours, minutes, seconds)
//     const randomDate = new Date(
//       2020,
//       Math.floor(Math.random() * 36),
//       Math.floor(Math.random() * 28),
//       Math.floor(Math.random() * 24),
//       Math.floor(Math.random() * 60),
//       Math.floor(Math.random() * 60)
//     );

//     users.push({
//       id: `user-${index}`, //id
//       name: randomName,
//       balance: Math.floor(Math.random() * 10000) + 1000, // $$$
//       email: randomEmail,
//       registerAt: randomDate,
//       active: Math.random() > 0.2, // status
//     });
//   }
//   return users;
// };
// export const sampleUsers = randomUsers(150);
