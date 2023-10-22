export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://paace-f178cafcae7b.nevacloud.io/api/notes"
    );
    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res
        .status(response.status)
        .json({ message: "Failed to fetch data from the API" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
