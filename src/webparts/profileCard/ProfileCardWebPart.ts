import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ProfileCardWebPartStrings';
import ProfileCard from './components/ProfileCard';
import { IProfileCardProps } from './components/IProfileCardProps';

export interface IProfileCardWebPartProps {
  Title:string;
    Name:string;
    Role:string;
    Description:string;
    Picture:string;
}

export default class ProfileCardWebPart extends BaseClientSideWebPart<IProfileCardWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IProfileCardProps> = React.createElement(
      ProfileCard,
      {
        Description: this.properties.Description,
        Title: this.properties.Title,
        Name: this.properties.Name,
        Picture: this.properties.Picture,
        Role: this.properties.Role,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
