import { queryExe } from "./sql.js";

function get_info(req, res) {
  queryExe("select * from info", function (error, results) {
    res.json(results);
  });
}

function get_photos(req, res) {
  queryExe(
    `select * from photos where id = ${req.query.id}`,
    function (error, results) {
      const photos = results.map((photo) => {
        return photo.name;
      });
      res.json(photos);
    },
  );
}

export { get_info, get_photos };
