import { Injectable } from '@angular/core';
import { NavigationEntry } from './navigation-entry';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private menuItemList: NavigationEntry[] = [];

  constructor() {
    this.createDefault();
  }

  public addMenuItem(value: NavigationEntry): void {
    this.menuItemList.push(value);
  }

  public get menuItems(): NavigationEntry[] {
    return this.menuItemList;
  }

  private createDefault(): void {
    /* Dashboard Menu Item */
    this.addMenuItem({ title: 'pages.dashboard.label', icon: 'dashboard', routerLink: 'dashboard' } as NavigationEntry);

    /* Visitors Menu Item - [Customers, Leads, Segments]*/
    this.addMenuItem({
      title: 'pages.visitors.label',
      icon: 'person',
      subEntries: [
        { title: 'pages.visitors.customers.label', icon: 'group', routerLink: 'visitors/customers' } as NavigationEntry,
        { title: 'pages.visitors.leads.label', icon: 'person_outline', routerLink: 'visitors/leads' } as NavigationEntry,
        { title: 'pages.visitors.segments.label', icon: 'groups', routerLink: 'visitors/segments' } as NavigationEntry,
      ],
    } as NavigationEntry);

    /* Sales Menu Item - [Applications, Invoices]*/
    this.addMenuItem({
      title: 'pages.sales.label',
      icon: 'receipt',
      subEntries: [
        { title: 'pages.sales.applications.label', icon: 'panorama_fish_eye', routerLink: 'sales/application' } as NavigationEntry,
        { title: 'pages.sales.invoices.label', icon: 'panorama_fish_eye', routerLink: 'sales/invoice' } as NavigationEntry,
      ],
    } as NavigationEntry);

    /* Tariffs Menu Item - [Motor Insurance] */
    this.addMenuItem({
      title: 'pages.tariffs.label',
      icon: 'credit_card',
      subEntries: [
        { title: 'pages.tariffs.motor-insurance.label', icon: 'directions_car', routerLink: 'tariffs/motor-vehicle' } as NavigationEntry,
      ],
    } as NavigationEntry);

    /* Catalog Menu Item - [Services, Content] */
    this.addMenuItem({
      title: 'pages.catalog.label',
      icon: 'view_module',
      subEntries: [
        { title: 'pages.catalog.marketing.label', icon: 'card_giftcard', routerLink: 'catalog/marketing' } as NavigationEntry,
        { title: 'pages.catalog.services.label', icon: 'view_list', routerLink: 'catalog/services' } as NavigationEntry,
        { title: 'pages.catalog.content.label', icon: 'wysiwyg', routerLink: 'catalog/content' } as NavigationEntry,
        { title: 'pages.catalog.policy.label', icon: 'summarize', routerLink: 'catalog/policy' } as NavigationEntry,
        { title: 'pages.catalog.faqs.label', icon: 'help_center', routerLink: 'catalog/faqs' } as NavigationEntry,
      ],
    } as NavigationEntry);

    /* Claims Menu Item */
    this.addMenuItem({
      title: 'pages.claims.label',
      icon: 'copyright',
      routerLink: 'claims',
    } as NavigationEntry);

    /* Agent Menu Item */
    this.addMenuItem({ title: 'pages.agent.label', icon: 'domain', routerLink: 'agents' } as NavigationEntry);

    /* Broker Menu Item */
    this.addMenuItem({ title: 'pages.broker.label', icon: 'business_center', routerLink: 'brokers' } as NavigationEntry);

    /* NIC Menu Item 
    this.addMenuItem({ title: 'pages.configuration.nia.title', icon: 'cloud_upload', routerLink: 'nic' } as NavigationEntry);
    */

    /* Report Item */
    this.addMenuItem({ title: 'pages.reports.label', icon: 'assignment', routerLink: 'reports' } as NavigationEntry);

    /* Messages Menu Item */
    this.addMenuItem({ title: 'pages.messages.label', icon: 'chat', routerLink: 'messages' } as NavigationEntry);

    /* Reviews Menu Item */
    this.addMenuItem({ title: 'pages.reviews.label', icon: 'rate_review', svgIcon: 'box', routerLink: 'reviews' } as NavigationEntry);

    /* Configuration Menu Item */
    this.addMenuItem({
      title: 'pages.configuration.label',
      icon: 'settings',
      subEntries: [
        { title: 'pages.configuration.payment.label', icon: 'payment', routerLink: 'configuration/payment' } as NavigationEntry,
        { title: 'pages.configuration.nic.label', icon: 'cloud_upload', routerLink: 'configuration/nic-mid' } as NavigationEntry
      ], 
    } as NavigationEntry);
  }
}
