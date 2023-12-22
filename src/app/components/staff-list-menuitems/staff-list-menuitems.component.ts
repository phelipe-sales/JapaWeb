import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { StaffSidemenuComponent } from '../staff-sidemenu/staff-sidemenu.component';
import { MenuItemResult } from '../../models/menuItem';
import { MenuItemService } from '../../services/menu-item.service';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
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
import { merge, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-staff-list-menuitems',
  standalone: true,
  imports: [CommonModule, StaffSidemenuComponent, FormsModule,MatSortModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatInputModule, CurrencyMaskModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './staff-list-menuitems.component.html',
  styleUrl: './staff-list-menuitems.component.scss'
})
export class StaffListMenuitemsComponent implements OnInit {
  displayedColumns: string[] = ['imageUrl', 'name', 'description', 'price', 'categoryName', 'ingredientsName', 'isRodizioItem', 'isAvailable', 'edit'];

  menuItems: MenuItemResult[] = [];
  pageSizes = [5, 10, 20];
  resultsLength = 0;
  searchTerm: string = '';
  errorMessage: string = '';

  isEditModalOpen = false;
  selectedMenuItem: MenuItemResult | undefined;
  updatedMenuItemMessage: string = '';
  categories: CategoryResult[] = [];
  ingredients: IngredientResult[] = [];

  ngOnInit(): void { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private menuItemService: MenuItemService, private categoryService: CategoryService, private ingredientService: IngredientService, private route: Router) { }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
  
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.menuItemService.getAll(
            this.searchTerm,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        })
      )
      .subscribe({
        next: (response) => {
          this.resultsLength = response.data.totalItems;
          this.errorMessage = '';
          this.menuItems = response.data.items;
        },
        error: (error) => {
          console.log('--->>> error => ', error);
          this.menuItems = [];
          this.errorMessage = error.error.errorMessages[0];
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

  searchByTerm() {
    if (this.searchTerm.trim() !== '') {
      this.menuItemService.searchMenuItem(this.searchTerm)
        .subscribe({
          next: (response) => {
            console.log('searched items', response);
            this.menuItems = response.data.items;
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
    } else {
      this.ngAfterViewInit();
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
    this.ngAfterViewInit();
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