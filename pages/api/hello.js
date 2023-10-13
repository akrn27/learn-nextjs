// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// try {
//   const response = await (await fetch("https://dummyjson.com/users")).json();
//   res.status(200).json({ ...response });
// } catch (error) {
//   console.log(error);
// }
export default async function handler(req, res) {
  try {
    // const res = await fetch("https://dummyjson.com/users");
    // const data = await res.json({ ...res });
    // return data;
    const response = await (await fetch("https://dummyjson.com/users")).json();
    res.status(200).json({ ...response });
  } catch (error) {
    console.log(error);
  }
}

// res.status(200).json({ name: "John Doe" });
