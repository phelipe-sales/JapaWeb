import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';
import { CategoryService } from '../../services/category.service';
import { MenuItemWithCategory } from '../../models/menuItem';
import { MenuItemService } from '../../services/menu-item.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-customer-rodizio',
  standalone: true,
  imports: [CommonModule, CustomerHeaderComponent, MatListModule],
  templateUrl: './customer-rodizio.component.html',
  styleUrl: './customer-rodizio.component.scss'
})
export class CustomerRodizioComponent implements OnInit {

  categoriesName: string[] = [];
menuItems: MenuItemWithCategory[] = [];
  currentlyCategory: string = '';

  constructor(private categoryService: CategoryService, private menuItemService: MenuItemService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategoriesName()
      .subscribe({
        next: (response) => {
          this.categoriesName = response.data;
        },
        error: (error) => {
          console.log(error);
        }
      });

      this.menuItemService.getByCategory()
      .subscribe({
        next: (response) => {
          this.menuItems = response.data;
          
        }
      });
  }

}