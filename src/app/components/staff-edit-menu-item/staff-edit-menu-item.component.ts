import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemResult } from '../../models/menuItem';
import { MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CategoryResult } from '../../models/category';
import { IngredientResult } from '../../models/ingredient';
import { CategoryService } from '../../services/category.service';
import { IngredientService } from '../../services/ingredient.service';
import { MenuItemService } from '../../services/menu-item.service';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { StaffSidemenuComponent } from '../staff-sidemenu/staff-sidemenu.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-staff-edit-menu-item',
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatButtonModule, CommonModule, StaffSidemenuComponent, FormsModule, MatSortModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatInputModule, CurrencyMaskModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './staff-edit-menu-item.component.html',
  styleUrl: './staff-edit-menu-item.component.scss'
})
export class StaffEditMenuItemComponent implements OnInit {

  errorMessage: string = '';
  updatedMenuItemMessage: string = '';
  selectedMenuItem!: MenuItemResult;
  categories: CategoryResult[] = [];
  ingredients: IngredientResult[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: MenuItemResult,
    private menuItemService: MenuItemService,
    private categoryService: CategoryService,
    private ingredientService: IngredientService,
    private route: Router,
    private dialogRef: MatDialogRef<StaffEditMenuItemComponent>) { }

  ngOnInit() {
    this.selectedMenuItem = this.data;
    this.loadCategories();
    this.loadIngredients();
  }

  saveChanges(selectedMenuItem: MenuItemResult) {

    this.menuItemService.updateMenuItem(selectedMenuItem)
      .subscribe({
        next: (response) => {
          this.updatedMenuItemMessage = 'Item do menu atualizado com sucesso.';
          console.log(response);
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Erro no componente:', error);
          if (error.status === 401) {
            console.log('authentication error => :')
            this.route.navigate(['staff/unauthorized']);
          }
          console.error('Erro:', error);
          this.errorMessage = error.error.errorMessages[0];
        }
      });

    console.log('Salvando alterações...', selectedMenuItem);
  }

  loadCategories() {
    this.categoryService.getAllCategories(0, 100)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.categories = response.data.items;
        },
        error: (error) => {
          console.error('Erro no componente:', error);
          if (error.status === 401) {
            console.log('authentication error => :')
            this.route.navigate(['staff/unauthorized']);

          } else {
            console.error('Erro HTTP no componente:', error);
            this.errorMessage = error.error.errorMessages[0];
          }
        }
      });
  }

  loadIngredients() {
    this.ingredientService.getAllIngredients(0, 100)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.ingredients = response.data.items;
        },
        error: (error) => {
          console.error('Erro no componente:', error);
          if (error.status === 401) {
            console.log('authentication error => :')
            this.route.navigate(['staff/unauthorized']);
          } else {
            console.error('Erro HTTP no componente:', error);
            this.errorMessage = error.error.errorMessages[0];
          }
        }
      });
  }

  clearMessages() {
    this.errorMessage = '';
    this.updatedMenuItemMessage = '';
  }
}
