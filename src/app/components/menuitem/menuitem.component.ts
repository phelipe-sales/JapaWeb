import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffSidemenuComponent } from '../staff-sidemenu/staff-sidemenu.component';
import { MenuItem } from '../../types/menu-item.interface';
import { MenuItemService } from '../../services/menu-item.service';
import { FormsModule } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CategoryResult } from '../../types/category.interface';

@Component({
  selector: 'app-menuitem',
  standalone: true,
  imports: [CommonModule, StaffSidemenuComponent, FormsModule],
  templateUrl: './menuitem.component.html',
  styleUrls: ['./menuitem.component.scss']
})
export class MenuItemComponent implements OnInit {
  menuItems: MenuItem[] = [];
  page = 0;
  pageSize = 10;
  totalPages = 0;
  showPreviousButton = false;
  showNextButton = true;
  isEditModalOpen = false;
  selectedMenuItem: MenuItem | undefined;
  errorMessage: string = '';
  updatedMenuItemMessage: string = '';
  categories: CategoryResult[] = [];

  currencyMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    prefix: 'R$ ',
    placeholder: '0',
  });

  constructor(private menuItemService: MenuItemService, private route: Router, private categoryService: CategoryService) { }

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
            this.route.navigate(['unauthorized']);

          } else {
            console.error('Erro HTTP no componente:', error);
            this.errorMessage = 'Algo deu errado; por favor, tente novamente mais tarde.';
          }
        }
      });
  }

  loadCategories() {
    this.categoryService.getAllCategories(0, 10)
      .subscribe({
        next:(response) => {
          console.log(response);
          this.categories =  response.data.items;
        },
        error: (error) => {
          console.error('Erro no componente:', error);
          if (error.status === 401) {
            console.log('authentication error => :')
            this.route.navigate(['unauthorized']);

          } else {
            console.error('Erro HTTP no componente:', error);
            this.errorMessage = 'Algo deu errado; por favor, tente novamente mais tarde.';
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

  editMenuItem(item: MenuItem) {
    this.loadCategories();

    this.isEditModalOpen = true;
    this.selectedMenuItem = { ...item };
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedMenuItem = undefined;
    this.loadMenuItems();
  }

  saveChanges(selectedMenuItem: MenuItem) {
    selectedMenuItem.price = parseFloat(selectedMenuItem.price.toFixed(2));

    this.menuItemService.updateMenuItem(selectedMenuItem).subscribe({
      next: (response) => {
        this.updatedMenuItemMessage = 'Item do menu atualizado com sucesso.';
        console.log(response);
      },
      error: (error) => {
        console.error('Erro no componente:', error);
        if (error.status === 401) {
          console.log('authentication error => :')
          this.route.navigate(['unauthorized']);

        } else {
          console.error('Erro HTTP no componente:', error);
          this.errorMessage = 'Algo deu errado; por favor, tente novamente mais tarde.';
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