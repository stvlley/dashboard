import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { useStateContext } from '../contexts/ContextProvider'
import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';





const Orders = () => {

  const [reports, setReports] = useState([])
  useEffect(() => {
      fetch('https://data.austintexas.gov/resource/fdj4-gpfu.json')
          .then(response => response.json())
          .then(data => setReports(data))
          .catch(err => console.error(err));
  }, [])
  console.log(reports)
  const crimeType  = reports.map((report) =>report.crime_type)
  console.log(crimeType)
  
  const { currentMode } = useStateContext();
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className={currentMode === 'Dark' ? 'bg-secondary-dark-bg m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl' : 'm-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'}>
        <Header category="Page" title="Orders" />
        <GridComponent
          id="gridcomp"
          dataSource={ordersData}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          contextMenuItems={contextMenuItems}
          editSettings={editing}
        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
        </GridComponent>
      </div>

  );
};
export default Orders;