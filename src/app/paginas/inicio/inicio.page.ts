import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {


  id!: string|null;
  tipo!: string | null;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.id= this.route.snapshot.queryParamMap.get('id');
    this.tipo = this.route.snapshot.queryParamMap.get('tipo');
  }

}
