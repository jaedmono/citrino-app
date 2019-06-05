import {Component, OnInit, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Modeler, OriginalPropertiesProvider, PropertiesPanelModule, InjectionNames, OriginalPaletteProvider} from './bpmn-js/bpmn-js';
import {CustomPropsProvider} from './props-provider/CustomPropsProvider';
import {CustomPaletteProvider} from './props-provider/CustomPaletteProvider';

/*const customModdle = {
    name: 'customModdle',
    uri: 'http://example.com/custom-moddle',
    prefix: 'custom',
    xml: {
      tagAlias: 'lowerCase'
    },
    associations: [],
    types: [
      {
        name: 'ExtUserTask',
        extends: [
          'bpmn:UserTask'
        ],
        properties: [
          {
            name: 'worklist',
            isAttr: true,
            type: 'String'
          }
        ]
      },
    ]
  };*/

@Component({
    selector: 'app-bpmn',
    templateUrl: './bpmn.component.html',
    styleUrls: []
})
export class BpmnComponent implements OnInit {
modeler;
@Input() documentXml;

constructor(private http: HttpClient) {
}

ngOnInit(): void {
    this.modeler = new Modeler({
    container: '#canvas',
    width: '100%',
    height: '600px'/*,
    additionalModules: [
        PropertiesPanelModule,

        // Re-use original bpmn-properties-module, see CustomPropsProvider
        {[InjectionNames.bpmnPropertiesProvider]: ['type', OriginalPropertiesProvider.propertiesProvider[1]]},
        {[InjectionNames.propertiesProvider]: ['type', CustomPropsProvider]},

        // Re-use original palette, see CustomPaletteProvider
        {[InjectionNames.originalPaletteProvider]: ['type', OriginalPaletteProvider]},
        {[InjectionNames.paletteProvider]: ['type', CustomPaletteProvider]},
    ],
    propertiesPanel: {
        parent: '#properties'
    },
    moddleExtension: {
        custom: customModdle
    }*/
    });
    this.load();
}

    handleError(err: any) {
        if (err) {
        console.warn('Ups, error: ', err);
        }
    }

    load(): void {
        /*const url = '/assets/bpmn/tmp.bpmn';
        this.http.get(url, {
        headers: {observe: 'response'}, responseType: 'text'
        }).subscribe(
        (x: any) => {
            console.log('Fetched XML, now importing: ', x);
            this.modeler.importXML(x, this.handleError);
        },
        this.handleError
        );*/
        alert( this.documentXml);
        //const document = (new DOMParser()).parseFromString(this.documentXml, 'text/xml');
        this.modeler.importXML(this.documentXml, this.handleError);
    }

    save(): void {
        this.modeler.saveXML((err: any, xml: any) => console.log('Result of saving XML: ', err, xml));
    }
}

