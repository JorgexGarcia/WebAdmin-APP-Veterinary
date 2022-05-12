import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SearchService} from "../../services/search.service";
import {
  AidsInterface,
  BreedInterface,
  PetInterface,
  ProductInterface,
  PromotionInterface,
  QueriesInterface,
  ServiceInterface,
  TreatmentInterface,
  UserInterface
} from "../../models/interfaces/interfacesModel.interface";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public users: UserInterface[] = [];
  public treatments: TreatmentInterface[] = [];
  public services: ServiceInterface[] = []
  public queries: QueriesInterface[] = [];
  public promotions: PromotionInterface[] = [];
  public products: ProductInterface[] = [];
  public pets: PetInterface[] = [];
  public breeds: BreedInterface[] = [];
  public aids: AidsInterface[] = [];
  public word: string = '';

  constructor(private activatedRoute: ActivatedRoute,
              private searchService: SearchService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      ({value}) => {
        this.word = value;
        this.search(value);
    });
  }

  async search(value: string){
    await this.searchService.searchAll(value).subscribe({
      next: (resp: any) => {
        this.aids = resp.data.aids;
        this.users = resp.data.user;
        this.treatments = resp.data.treatment;
        this.services = resp.data.service;
        this.queries = resp.data.queries;
        this.promotions = resp.data.promotion;
        this.products = resp.data.products;
        this.pets = resp.data.pets;
        this.breeds = resp.data.breed;

        console.log(this.aids)
        console.log(this.users)
        console.log(this.treatments)
        console.log(this.services)
        console.log(this.queries)
        console.log(this.promotions)
        console.log(this.products)
        console.log(this.pets)
        console.log(this.breeds)
      }
    })
  }

  goUser(id: string) {
    this.router.navigateByUrl(`/main/user/${id}`)
  }
}
