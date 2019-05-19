import {Component, ViewChild, AfterViewInit} from '@angular/core';
import { Company} from '../../model/company.model';
import { CompanyService} from '../../service/company.service';


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

  constructor(private companyService: CompanyService) {

  }
  ngAfterViewInit() {
    this.companyService.getCompanies().subscribe(data => {this.data = data; });
  }
}
