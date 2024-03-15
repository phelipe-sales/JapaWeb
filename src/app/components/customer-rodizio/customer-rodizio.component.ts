import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';
import { CategoryService } from '../../services/category.service';
import { MenuItemResult } from '../../models/menuItem';
import { MenuItemService } from '../../services/menu-item.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-customer-rodizio',
  standalone: true,
  imports: [CommonModule, CustomerHeaderComponent, MatListModule],
  templateUrl: './customer-rodizio.component.html',
  styleUrls: ['./customer-rodizio.component.scss']
})
export class CustomerRodizioComponent implements OnInit {
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

  categories: string[] = [];
  menuItems: MenuItemResult[] = [];
  selectedCategory: string = '';
  visibleCategory: string | null = null;

  constructor(private categoryService: CategoryService, private menuItemService: MenuItemService) { }

  ngOnInit(): void {
    this.categoryService.getCategoriesName().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.menuItemService.all().subscribe({
      next: (response) => {
        this.menuItems = response.data;
      }
    });
  }

  scrollToCategory(event: Event, category: string): void {
    const element = event.currentTarget as HTMLElement;
    const scrollContainer = this.carouselContainer.nativeElement;
    const scrollLeft = element.offsetLeft - (scrollContainer.offsetWidth / 2) + (element.offsetWidth / 2);

    scrollContainer.classList.add('scroll-animation');
    scrollContainer.scrollLeft = scrollLeft;

    this.selectedCategory = category;

    setTimeout(() => {
      scrollContainer.classList.remove('scroll-animation');
    }, 500);

    const categoryId = `#${category}`;
    const element2 = document.querySelector(categoryId);

    if (element2) {
      const offset = 130;
      const topPos = element2.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: topPos, behavior: 'smooth' });
      this.selectedCategory = category;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.updateVisibleCategory();

  }

  updateVisibleCategory(): void {
    const scrollTop = window.scrollY;
    let found = false;

    for (const category of this.categories) {
      const element = document.getElementById(category);

      if (element) {
        const offset = 130;
        const elementTop = element.getBoundingClientRect().top + scrollTop - offset;
        const elementBottom = elementTop + element.clientHeight;

        if (scrollTop >= elementTop && scrollTop <= elementBottom) {
          this.visibleCategory = category;
          found = true;
          break;
        }
      }
    }

    if (!found) {
      this.visibleCategory = null;
    }
  }

  hasItemsInCategory(category: string): boolean {
    return this.menuItems.some((item) => item.categoryName === category);
  }

  getMenuItemsByCategory(category: string): MenuItemResult[] {
    return this.menuItems.filter((item) => item.categoryName === category);
  }
}