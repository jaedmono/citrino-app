import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Company} from '../../model/company.model';
import { CompanyService} from '../../service/company.service';
import { DialogComponent} from '../dialog/dialog.component';


@Component({
  selector: 'app-lists',
  templateUrl: './empresa.list.component.html',
  styleUrls: []
})
export class ListEmpresaComponent implements AfterViewInit {
  displayedColumns: string[] = ['id',
                                'nit',
                                'nameCompany',
                                'totalEmployees',
                                'companyType',
                                'acteconomia',
                                'fjuridica',
                                'ambitooper',
                                'stateCompany',
                                'action'
                              ];
  public data: Company[];
  public company = new Company();

  constructor(private companyService: CompanyService, public dialog: MatDialog) {

  }

  ngAfterViewInit() {
    this.companyService.getCompanies().subscribe(data => {this.data = data; });
  }

  deleteCompany(company): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: {messageHeader: 'Eliminar Empresa', message: 'Esta seguro de borrar esta empresa'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.companyService.deleteCompany(company)
          .subscribe( data => {
            this.data = this.data.filter(u => u !== company);
          });
      }
    });
  }

  updateCompany(company): void {
    this.company.idCompany = company.idCompany;
    this.company.nameCompany = company.nameCompany;
    this.company.nitCompany = company.nitCompany;
    this.company.stateCompany = company.stateCompany;
    this.company.totalEmployees = company.totalEmployees;
    this.company.acteconomia = company.acteconomia;
    this.company.ambitooper = company.ambitooper;
    this.company.companyType = company.companyType;
    this.company.fjuridica = company.fjuridica;
  }

}
