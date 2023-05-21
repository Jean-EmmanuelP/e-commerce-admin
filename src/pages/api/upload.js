import multiparty from "multiparty";

export default async function handle(req, res) {
  const form = new multiparty.Form();

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });

    console.log("length: ", files.file.length);
    res.json("ok");
  } catch (error) {
    console.error("An error occurred during form parsing", error);
    res.status(500).json("Internal Server Error");
  }
}

export const config = {
  api: { bodyParser: false },
};
