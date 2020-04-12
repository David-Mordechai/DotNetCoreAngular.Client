import { Component, OnInit } from '@angular/core';
import { BasictableService } from '../services/basicTable/basictable.service';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../models/periodicElement';

@Component({
  selector: 'app-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss']
})
export class BasicTableComponent implements OnInit {

  dataSource = new MatTableDataSource<PeriodicElement>();
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  isLoading = true;

  constructor(private basictableService: BasictableService) { }

  ngOnInit() {
    this.basictableService.getData().subscribe((data) => {
      setTimeout(() => {
        this.isLoading = false;
        this.dataSource.data = data;
      }, 500);
    },
      error => setTimeout(() => { this.isLoading = false; }, 500)
    );
  }
}
