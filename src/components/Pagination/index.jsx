import { Pagination } from "@mui/material";
import { Stack } from "@mui/system";

const CustomPagination = ({
  page,
  handlePageChange,
  totalCount,
  limit = 10,
}) => {
  return (
    <>
      {totalCount > limit ? (
        <div className={`pagination_div`}>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil((totalCount || 0) / limit)}
              variant="outlined"
              shape="rounded"
              onChange={(e, value) => handlePageChange(value)}
              page={page}
            />
          </Stack>
        </div>
      ) : null}
    </>
  );
};
export default CustomPagination;
