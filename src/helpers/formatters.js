/**
 * Formaters for response should be defined here. Just in case we will ever need something other than JSON.
 */

export const json = (res, data) => {
  data =
    data && data.pagination
      ? {
          results: data.serialize(),
          pagination: data.pagination
        }
      : data;
  res.json(data);
};
