import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffSidemenuComponent } from '../staff-sidemenu/staff-sidemenu.component';
import { MenuItemResult } from '../../models/menuItem';
import { MenuItemService } from '../../services/menu-item.service';
import { Router, RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { CategoryResult } from '../../models/category';
import { IngredientResult } from '../../models/ingredient';
import { CategoryService } from '../../services/category.service';
import { IngredientService } from '../../services/ingredient.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-staff-list-menuitems',
  standalone: true,
  imports: [CommonModule, StaffSidemenuComponent,FormsModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatInputModule, CurrencyMaskModule, MatIconModule, RouterModule],
  templateUrl: './staff-list-menuitems.component.html',
  styleUrl: './staff-list-menuitems.component.scss'
})
export class StaffListMenuitemsComponent implements OnInit {
  menuItems: MenuItemResult[] = [];
  page = 0;
  pageSize = 10;
  totalPages = 0;
  showPreviousButton = false;
  showNextButton = true;
  isEditModalOpen = false;
  selectedMenuItem: MenuItemResult | undefined;
  errorMessage: string = '';
  updatedMenuItemMessage: string = '';
  categories: CategoryResult[] = [];
  ingredients: IngredientResult[] = [];
  value = '';
  constructor(private menuItemService: MenuItemService, private categoryService: CategoryService, private ingredientService: IngredientService, private route: Router) { }

  ngOnInit() {
    this.loadMenuItems();
  }

  loadMenuItems() {
    this.menuItemService.getAllMenuItems(this.page, this.pageSize)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.menuItems = response.data.items;
          this.totalPages = Math.ceil(response.data.totalItems / this.pageSize);
          console.log(this.totalPages);
          this.showPreviousButton = this.page > 0;
          this.showNextButton = this.page < this.totalPages - 1;
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
  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadMenuItems();
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.loadMenuItems();
    }
  }

  editMenuItem(item: MenuItemResult) {
    this.clearMessages();
    this.loadIngredients();
    this.loadCategories();

    this.isEditModalOpen = true;
    this.selectedMenuItem = { ...item };
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedMenuItem = undefined;
    this.loadMenuItems();
  }

  saveChanges(selectedMenuItem: MenuItemResult) {

    this.menuItemService.updateMenuItem(selectedMenuItem)
      .subscribe({
        next: (response) => {
          this.updatedMenuItemMessage = 'Item do menu atualizado com sucesso.';
          console.log(response);
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

    console.log('Salvando alterações...', selectedMenuItem);
  }

  clearMessages() {
    this.errorMessage = '';
    this.updatedMenuItemMessage = '';
  }
}