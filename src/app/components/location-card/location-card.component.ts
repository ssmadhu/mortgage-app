import { Component, Input, OnChanges, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import { Vector as VectorLayer } from 'ol/layer';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { fromLonLat } from 'ol/proj';
import { MortgageService } from 'src/app/services/mortgage/mortgage.service';
import { ZipCode } from 'zipcodes';
@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class LocationCardComponent implements OnInit, OnChanges {

  public map;
  public location: ZipCode;
  @Input() lat?: number;
  @Input() long?: number;
  @Input() zoom?: number;
  @Input() zipcode?: number;
  constructor(private mortgageService: MortgageService) { }

  ngOnInit(): void {
    this.initCard();
  }

  ngOnChanges(): void {

  }

  initCard(): void {
    if (this.zipcode) {
      this.loadLatLongFromZipCode();
      this.loadMap();
    }
  }

  loadLatLongFromZipCode(): void {
    this.location = this.mortgageService.getLatLongFromZipCode(this.zipcode);
  }

  loadMap(): void {
    const iconFeature = new Feature({
      geometry: new Point(fromLonLat([this.location.longitude, this.location.latitude]))
    });
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'data/icon.png',
      }),
    });
    if(this.map) {
      this.map.clear();
    }
    this.map = new Map({
      target: 'hotel_map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        new VectorLayer({
          source: new VectorSource({ features: [iconFeature] })
        })
      ],
      view: new View({
        center: olProj.fromLonLat([this.location.longitude, this.location.latitude]),
        zoom: this.zoom || 5
      })
    });
  }

}
