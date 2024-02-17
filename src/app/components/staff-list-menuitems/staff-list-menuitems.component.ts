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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StaffEditMenuItemComponent } from '../staff-edit-menu-item/staff-edit-menu-item.component';
import { StaffCreateMenuItemComponent } from '../staff-create-menu-item/staff-create-menu-item.component';

@Component({
  selector: 'app-staff-list-menuitems',
  standalone: true,
  imports: [MatDialogModule, CommonModule, StaffSidemenuComponent, FormsModule, MatSortModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatInputModule, CurrencyMaskModule, MatIconModule, RouterModule, MatPaginatorModule],
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
  searchTerm2: string = '';
  isEditModalOpen = false;
  selectedMenuItem: MenuItemResult | undefined;
  updatedMenuItemMessage: string = '';
  categories: CategoryResult[] = [];
  ingredients: IngredientResult[] = [];

  ngOnInit(): void { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private menuItemService: MenuItemService,
    private categoryService: CategoryService,
    private ingredientService: IngredientService,
    private route: Router,
    private dialog: MatDialog) { }

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
          if (error.status === 401 || error.status === 403) {
            console.log('authentication error => :')
            this.route.navigate(['staff/unauthorized']);
          }
          if (error.status === 404) {
            this.resultsLength = 0;
          }
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
          if (error.status === 401 || error.status === 403) {
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
          if (error.status === 401 || error.status === 403) {
            console.log('authentication error => :')
            this.route.navigate(['staff/unauthorized']);
          } else {
            console.error('Erro HTTP no componente:', error);
            this.errorMessage = error.error.errorMessages[0];
          }
        }
      });
  }

  createMenuItem(){
    const dialogRef = this.dialog.open(StaffCreateMenuItemComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngAfterViewInit();
      }
    });
  }

  editMenuItem(item: MenuItemResult) {
    const dialogRef = this.dialog.open(StaffEditMenuItemComponent, {
      data: { ...item }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngAfterViewInit();
      }
    });
  }

  clearMessages() {
    this.errorMessage = '';
    this.updatedMenuItemMessage = '';
  }

  search() {
    if (this.searchTerm2.length >= 3) {
      this.searchTerm = this.searchTerm2;
    } else if (this.searchTerm2.length === 0) {
      this.searchTerm = '';
    }

    this.ngAfterViewInit();
  }
}