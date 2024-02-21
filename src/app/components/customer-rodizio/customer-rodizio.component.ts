import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';
import { CategoryService } from '../../services/category.service';
import { MenuItemResult } from '../../models/menuItem';
import { MenuItemService } from '../../services/menu-item.service';
import { MatListModule } from '@angular/material/list';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-customer-rodizio',
  standalone: true,
  imports: [CommonModule, CustomerHeaderComponent, MatListModule],
  templateUrl: './customer-rodizio.component.html',
  styleUrl: './customer-rodizio.component.scss'
})
export class CustomerRodizioComponent implements OnInit {

  categoriesName: string[] = [];
  menuItems: MenuItemResult[] = [];

  constructor(private categoryService: CategoryService, private menuItemService: MenuItemService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategoriesName()
      .subscribe({
        next: (response) => {
          this.categoriesName = response.data;
          const observables = this.categoriesName.map(categoryName => this.menuItemService.getByCategory(categoryName));

          forkJoin(observables)
            .subscribe({
              next: (responses) => {
                this.menuItems = responses.map(response => response.data).flat();
              },
              error: (error) => {
                console.log(error);
              }
            });
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  loadMenuItems(categoryName: string) {
    this.menuItemService.getByCategory(categoryName)
      .subscribe({
        next: (response) => {
          this.menuItems = response.data;
          console.log(this.menuItems);
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  trackMenuItem(index: number, menuItem: MenuItemResult): string {
    return menuItem.id;
  }

}