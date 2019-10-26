import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-index',
  template: `

    <article [ngClass]="color">
      <div class="container" fxLayout="row wrap" fxLayoutAlign="start start" [@fadeInOut]>
        <div class="item" fxFlex="1 1 32%" fxFlex.lt-md="1 1 100%">
          <h2 class="mat-h2">{{'university' | transloco}}</h2>

          <p>
          La Universidad de Pinar del Río “Hermanos Saíz Montes de Oca” nace el 1º de septiembre de 2015 a partir de la integración de tres centros con excelente trayectoria y probados aportes al desarrollo económico, social y científico de la provincia y el país: la Universidad de Ciencias Pedagógicas “Rafael María de Mendive”, la Facultad de Cultura Física “Nancy Uranga” y la Universidad “Hermanos Saíz Montes de Oca”.

          La casa de alto estudios en Vueltabajo se compone por siete facultades, diez Centros Universitarios Municipales y una Unidad Presupuestada Independiente: el Jardín Botánico Orquideario de Soroa.

          En esta estructura se integran ramas de las ciencias forestales y agropecuarias, económicas y empresariales, sociales y humanísticas, técnicas, pedagógicas y de la cultura física; lo cual constituye una enorme fortaleza para abordar y dar solución integrada a los problemas del territorio y responde al carácter universal del origen de las universidades.
          </p>

        </div>

        <div class="item" fxFlex="1 1 32%" fxFlex.lt-md="1 1 100%">
            <h2 class="mat-h2">{{'mission' | transloco}}</h2>
            <p>
              La Universidad de Pinar del Río contribuye a satisfacer las necesidades formativas de profesionales de nivel superior y su superación continua en las ciencias agropecuarias, técnicas, sociales, humanísticas, pedagógicas y de la cultura física y el deporte, a partir de la integración de los procesos sustantivos y de apoyo, que garantice un egresado competente, comprometido con la Revolución y con una cultura integral, así como la generación e implementación de resultados científico-técnicos que impacten en el desarrollo socioeconómico de la provincia Pinar del Río y otras regiones del país.
            </p>


        </div>

        <div class="item" fxFlex="1 1 32%" fxFlex.lt-md="1 1 100%">
            <h2 class="mat-h2">{{'view' | transloco}}</h2>

            <p>
            Somos una Universidad que alcanza reconocimiento nacional e internacional por la calidad en sus procesos principales. Formamos profesionales integrales, competentes, reconocidos nacional e internacionalmente, de amplia formación humanística, portadores de una cultura general, comprometidos con la Patria y la Revolución Cubana. Fortalecemos los procesos de universalización e incrementamos el ingreso a las carreras priorizadas, las que se consolidan y acreditan nacionalmente, logrando un alto impacto en la sociedad pinareña. Satisfacemos con calidad la demanda de formación continua de los profesionales del territorio, a partir de programas de postgrado propios y externos. Logramos resultados de impacto en la preparación y superación continua de los directivos del estado, gobierno y sistema empresarial. Son reconocidos a nivel territorial y nacional el papel y los resultados de la universidad en la gestión de la innovación, en particular en las áreas de: desarrollo forestal sostenible, producción sostenible de alimentos, desarrollo local, ciencias de la educación y sociales, medio ambiente y energía, desarrollo cooperativo y turismo. Continuamos las transformaciones en la gestión de la extensión universitaria, aplicando su concepción de proceso formativo. Incrementamos las relaciones con los países desarrollados y se consolidan con América Latina y el Caribe, fortaleciéndose nuestra imagen internacional. Somos un referente nacional en la gestión de los procesos internos de la universidad.
            </p>


        </div>
      </div>
    </article>

    <article [ngClass]="otherColor">
      <div class="container" fxLayout="row wrap" fxLayoutAlign="start start" [@fadeInOut]>
        <div class="item" fxFlex="1 1 32%" fxFlex.lt-md="1 1 100%">
          <h1 class="mat-h1">Consejo de Dirección</h1>
        </div>

      </div>
    </article>

  `,
  styles: [`
    .container {
      padding: 30px 30px 10px 30px;
    }

    .item {
      margin: 5px;
    }

    .green {
      background: linear-gradient(100deg,#13632F,#00C853);
      color: white;
      box-shadow: 0 1px 2px -1px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 2px 0 rgba(0,0,0,.12);
    }

    .white {
      background: linear-gradient(100deg, #fff,#fff);
      color: #13632F;
      box-shadow: 0 1px 2px -1px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 2px 0 rgba(0,0,0,.12);
    }
  `],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ])
  ]
})
export class IndexComponent implements OnInit {

  color: string;
  otherColor: string;

  constructor() { }

  ngOnInit() {
    this.color = 'white';
    this.otherColor = 'green';
  }

}
