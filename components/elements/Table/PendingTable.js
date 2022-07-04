import React, { useState, useEffect } from "react";
// import MaterialTable from 'material-table'
import MaterialTable, { MTableToolbar } from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { DataUsage, KeyboardArrowRight } from "@material-ui/icons";
import { recentData } from "../../Data/TableData";
import styles from "./DemoTable.module.css";

const Table = (props) => {
  // const [TableData, setTableData] = useState(props.TableData);
  const [columns, setColumns] = useState(props.TableColumn);

  let { TableData } = props;
  const handleTableColumns = (cols) => {
    return cols.map((col) => ({
      ...col,
      render: (rowData) => {
        return (
          <span style={{ display: "flex" }}>
            <KeyboardArrowRight />
            {rowData[col]}
          </span>
        );
      },
    }));
  };

  const exportMenu = [
    {
      label: "Export PDF",
      exportFunc: (cols, datas) => ExportPdf(cols, datas, "yourPdfFile"),
    },
    {
      label: "Export CSV",
      exportFunc: (cols, datas) => ExportCsv(cols, datas, "yourCsvFile"),
    },
  ];
  const someStyleForTable = {
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "22px",
    fontWeight: "bold",
  };

  columns.map((column) => {
    column.headerStyle = someStyleForTable;
    column.cellStyle = {
      fontFamily: "Arial, Helvetica, sans-serif",
      fontSize: "18px",
    };
  });

  return (
    <div className={styles.Card}>
      <div className={styles.titleDivision}>
        <div className={styles.titleIcon}>
          <DataUsage />
        </div>

        <p className={styles.title}>{props.title}</p>
      </div>
      <div className={styles.bodyDivision}>
        <div style={{ maxWidth: "100%" }}>
          <MaterialTable
            options={{
              exportMenu: exportMenu,
              searchFieldStyle: someStyleForTable,
              paginationStyle: someStyleForTable,
              searchFieldVariant: "outlined",
            }}
            className={styles.material}
            columns={columns}
            data={TableData}
            title={props.caption}
            components={{
              Toolbar: (props) => (
                <div style={someStyleForTable}>
                  <MTableToolbar {...props} />{" "}
                </div>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
