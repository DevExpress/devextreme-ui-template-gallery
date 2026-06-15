import {
  Component, ViewChild, inject, afterNextRender, Injector,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDataGridComponent,
  DxDropDownButtonModule,
  DxSelectBoxModule,
} from 'devextreme-angular';

import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { jsPDF } from 'jspdf';

import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportDataGridToXLSX } from 'devextreme/excel_exporter';
import DataSource from 'devextreme/data/data_source';
import notify from "devextreme/ui/notify";
import { DxDropDownButtonTypes } from 'devextreme-angular/ui/drop-down-button';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';

import { Contact, contactStatusList, ContactStatus, } from 'src/app/types/contact';
import { ContactStatusComponent } from 'src/app/components';
import { DataService } from 'src/app/services';
import { formatPhone } from 'src/app/pipes/phone.pipe';
import { FormPopupComponent } from 'src/app/components';
import { ContactPanelComponent } from 'src/app/components/library/contact-panel/contact-panel.component';
import { ContactNewFormComponent } from 'src/app/components/library/contact-new-form/contact-new-form.component';

type FilterContactStatus = ContactStatus | 'All';

@Component({
  templateUrl: './crm-contact-list.component.html',
  styleUrls: ['./crm-contact-list.component.scss'],
  providers: [DataService],
  imports: [
    DxButtonModule,
    DxDataGridModule,
    DxDropDownButtonModule,
    DxSelectBoxModule,
    ContactPanelComponent,
    ContactNewFormComponent,
    FormPopupComponent,
    ContactStatusComponent,
    CommonModule,
  ]
})
export class CrmContactListComponent {
  @ViewChild(DxDataGridComponent, { static: true }) dataGrid!: DxDataGridComponent;

  @ViewChild(ContactNewFormComponent, { static: false }) contactNewForm!: ContactNewFormComponent;

  private service = inject(DataService);

  private injector = inject(Injector);

  statusList = contactStatusList;

  displayExprFn = () => '';

  filterStatusList = ['All', ...contactStatusList];

  isPanelOpened = false;

  isAddContactPopupOpened = false;

  userId: number | null = null;

  dataSource = new DataSource<Contact[], string>({
    key: 'id',
    load: () => new Promise((resolve, reject) => {
      this.service.getContacts().subscribe({
          next: (data: Contact[]) => resolve(data),
          error: ({message}) => reject(message)
        })
    }),
  });

  addContact() {
    this.isAddContactPopupOpened = true;
  };

  refresh = () => {
    this.dataGrid.instance.refresh();
  };

  rowClick(e: DxDataGridTypes.RowClickEvent) {
    const { data } = e;

    this.userId = data.id;
    this.isPanelOpened = true;
  }

  onOpenedChange = (value: boolean) => {
    if (!value) {
      this.userId = null;
    }
  };

  onPinnedChange = () => {
    afterNextRender(() => {
      this.dataGrid?.instance?.updateDimensions();
    }, { injector: this.injector });
  };

  filterByStatus = (e: DxDropDownButtonTypes.SelectionChangedEvent) => {
    const { item: status }: { item: FilterContactStatus } = e;

    if (status === 'All') {
      this.dataGrid.instance.clearFilter();
    } else {
      this.dataGrid.instance.filter(['status', '=', status]);
    }
  };

  customizePhoneCell = ({ value }: { value?: number }) => value ? formatPhone(value) : undefined;

  onExporting(e: DxDataGridTypes.ExportingEvent) {
    if (e.format === 'pdf') {
      const doc = new jsPDF();
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('Contacts.pdf');
      });
    } else {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Contacts');

      exportDataGridToXLSX({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Contacts.xlsx');
        });
      });
      e.cancel = true;
    }
  }

  onClickSaveNewContact = () => {
    const { firstName, lastName} = this.contactNewForm.getNewContactData();
    notify({
        message: `New contact "${firstName} ${lastName}" saved`,
        position: { at: 'bottom center', my: 'bottom center' }
      },
      'success');
  };
}
