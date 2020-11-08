import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BudgetItem } from 'src/shared/model/budget-item-model';
import { EditItemModelComponent } from '../edit-item-model/edit-item-model.component';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})



export class BudgetItemListComponent implements OnInit {

  @Input() budgetItems: BudgetItem[];
  @Output() delete: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  @Output() update: EventEmitter<UpdateEvent> = new EventEmitter<UpdateEvent>();


  constructor(public dialog: MatDialog) { }

  ngOnInit(){
  }

  onDeleteButtonClicked(item: BudgetItem) {

    this.delete.emit(item);
  }

  onCardClicked(item: BudgetItem) {

    const dialogRef = this.dialog.open(EditItemModelComponent,
      {
        width: '580px',
        data: item
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //result is updated budgetitem
        //replace the item from upadted/submitted item from form 
        //this.budgetItems[this.budgetItems.indexOf(item)] = result;
        this.update.emit({

          old: item,
          new: result

        });
      }
    })
  }
}


export interface UpdateEvent {
  old: BudgetItem;
  new: BudgetItem;

}