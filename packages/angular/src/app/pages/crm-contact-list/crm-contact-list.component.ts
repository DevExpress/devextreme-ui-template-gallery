import {
  Component, ViewChild, OnInit, NgModule, OnDestroy,
} from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDataGridComponent,
  DxDropDownButtonModule,
  DxSelectBoxModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { RowClickEvent, RowPreparedEvent, ColumnCustomizeTextArg } from 'devextreme/ui/data_grid';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportDataGridToXLSX } from 'devextreme/excel_exporter';
import {
  CardActivitiesModule,
  ContactStatusModule,
} from 'src/app/shared/components';
import { Contact, contactStatusList, ContactStatus, newContact } from 'src/app/shared/types/contact';
import { SelectionChangedEvent } from 'devextreme/ui/drop_down_button';
import { CommonModule } from '@angular/common';
import { RwaService } from 'src/app/shared/services';
import { Subscription } from 'rxjs';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { jsPDF } from 'jspdf';
import { UserPanelModule } from './user-panel/user-panel.component';
import { UserFormModule } from './user-form/user-form.component';
import {
  FormPopupModule,
  FormPopupComponent,
} from 'src/app/shared/components/'

type FilterContactStatus = ContactStatus | 'All';

@Component({
  templateUrl: './crm-contact-list.component.html',
  styleUrls: ['./crm-contact-list.component.scss'],
  providers: [RwaService],
})
export class CrmContactListComponent implements OnInit, OnDestroy {
  @ViewChild(DxDataGridComponent, { static: true }) dataGrid: DxDataGridComponent;

  @ViewChild('userPopup', { static: true }) userPopup: FormPopupComponent;

  statusList = contactStatusList;

  filterStatusList = ['All', ...contactStatusList];

  isPanelOpen = false;

  userId: number;

  newUser = newContact;

  dataSource: Contact[];

  dataSubscription: Subscription = new Subscription();

  constructor(private service: RwaService) {
  }

  ngOnInit(): void {
    this.dataSubscription = this.service.getContacts().subscribe((data) => {
      this.dataSource = data;
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  addContact() {
    this.userPopup.popupVisible = true;
  };

  refresh = () => {
    this.dataGrid.instance.refresh();
  };

  rowClick(e: RowClickEvent) {
    const { data } = e;

    this.userId = data.id;
    this.isPanelOpen = true;
  }

  rowPrepared = (e: RowPreparedEvent) => {
    const { rowElement } = e;

    rowElement.classList.add('clickable-row');
  };

  filterByStatus = (e: SelectionChangedEvent) => {
    const { item: status }: { item: FilterContactStatus } = e;

    if (status === 'All') {
      this.dataGrid.instance.clearFilter();
    } else {
      this.dataGrid.instance.filter(['status', '=', status]);
    }
  };

  formatPhone = (number: string | number): string => String(number).replace(/(\d{3})(\d{3})(\d{4})/, '+1($1)$2-$3');

  customizePhoneCell = (cellInfo: ColumnCustomizeTextArg) => {
    const { value } = cellInfo;

    if (!value) {
      return undefined;
    }

    return this.formatPhone(value.toString());
  };

  onExporting(e) {
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
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDataGridModule,
    DxDropDownButtonModule,
    DxSelectBoxModule,
    DxTextBoxModule,

    UserPanelModule,
    UserFormModule,
    FormPopupModule,
    CardActivitiesModule,
    ContactStatusModule,

    CommonModule,
  ],
  providers: [],
  exports: [],
  declarations: [CrmContactListComponent],
})
export class CrmContactListModule { }
