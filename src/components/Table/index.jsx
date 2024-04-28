import { Table } from "react-bootstrap";

const CustomTable = ({ header, children }) => {
  return (
    <div className={`table_container`}>
      <Table responsive="lg">
        <thead className={`table_head`}>
          <tr className={`table_heading_row`}>{header}</tr>
        </thead>
        <tbody>{children}</tbody>
      </Table>
    </div>
  );
};
export default CustomTable;
